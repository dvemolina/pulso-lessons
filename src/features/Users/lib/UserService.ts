import type { InsertUser, User } from "$src/lib/server/db/schemas/users";
import { UserRepository } from "./UserRepository";
import { hashPassword } from "$src/lib/utils/bcrypt";
import type { UserSignup } from "./userValidations";
import { sendClientSignupMail } from "$src/lib/nodemailer/nodemailer";


export class UserService {
    private userRepository = new UserRepository()

    async registerUserWithPassword(signupData: UserSignup): Promise<User> {
        if (signupData.phone && signupData.country_code) {
            const formattedPhone = `${signupData.country_code}-${signupData.phone}`;
            signupData.phone = formattedPhone;
        }
        const hashedPassword = await hashPassword(signupData.password);

        signupData.password = hashedPassword;

        delete signupData.country_code;
        delete signupData.confirm_password;

        const userData: InsertUser = {...signupData, role: 1};

        try {
            const createdUser = await this.userRepository.createUser(userData);
            console.log('User Created Successfully: ', createdUser);

            if (createdUser) {
                await sendClientSignupMail(createdUser.name, createdUser.email);
            }

            return createdUser;
        
        } catch (error) {
            console.error('Something went wrong when Creating the User', error);
            throw new Error('Algo falló intentando crear la cuenta de Usuario');
        }  
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findUserByEmail(email);
    
    }

    async getUserById(userId: number): Promise<User> {

        return await this.userRepository.getUserById(userId); 
    }

    async updateUserProfile(userId: number, updatedFields: Record<string, never>) {
        if(Object.keys(updatedFields).length === 0) {
                        return null
                    }
        
        const { sports, ...userFields } = updatedFields;
        
        // Update basic user fields
        if (Object.keys(userFields).length > 0) {
            await this.userRepository.updateUser(userId, userFields);
        }
    
        // Update sports if provided
        if (Array.isArray(sports)) {
            await this.userRepository.updateUserSports(userId, sports);
        }
    
        return true;
    }   
}