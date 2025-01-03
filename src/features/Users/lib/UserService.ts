import type { InsertUser} from "$src/lib/server/db/schemas/users";
import { UserRepository } from "./UserRepository";
import { hashPassword } from "$src/lib/utils/bcrypt";
import type { UserProfile, UserSignup } from "./userValidations";
import { sendUserSignupMail } from "$src/lib/nodemailer/nodemailer";


export class UserService {
    private userRepository = new UserRepository()

    async registerUserWithPassword(signupData: UserSignup, roleId: number) {
        if (signupData.phone && signupData.country_code) {
            const formattedPhone = `${signupData.country_code}-${signupData.phone}`;
            signupData.phone = formattedPhone;
        }
        const hashedPassword = await hashPassword(signupData.password);

        signupData.password = hashedPassword;

        delete signupData.country_code;
        delete signupData.confirm_password;

        try {
        if(roleId === 1) {
            const userData: InsertUser = {...signupData, roleId: 1};
            
                const createdUser = await this.userRepository.createUser(userData);
                console.log('User Created Successfully: ', createdUser);
    
                if (createdUser) {
                    await sendUserSignupMail(createdUser.name, createdUser.email, createdUser.roleId);
                }
    
                return createdUser;
            
            } else if (roleId === 2) {
                const instructorData: InsertUser = {...signupData, roleId: 2};
                
                const createdInstructor = await this.userRepository.createUser(instructorData);
                console.log('User Created Successfully: ', createdInstructor);
                
                if (createdInstructor) {
                    await sendUserSignupMail(createdInstructor.name, createdInstructor.email, createdInstructor.roleId);
                }
                
                return createdInstructor;
            }
        } catch (error) {
            console.error('Something went wrong when Creating the User', error);
            throw new Error('Algo falló intentando crear la cuenta de Usuario');
        }  
            
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findUserByEmail(email);
    }

    async getUserById(userId: number) {
        const user = await this.userRepository.getUserById(userId); 
        const sports = await this.userRepository.getUserSports(userId)

        return { ...user, sports };
    }

    async updateUserProfile(userId: number, updatedFields: UserProfile) {
        if(Object.keys(updatedFields).length === 0) {
            return null
        }
        if (updatedFields.phone_number && updatedFields.country_code) {
            const formattedPhone = `${updatedFields.country_code}-${updatedFields.phone_number}`;
            updatedFields.phone = formattedPhone;
        }
        delete updatedFields.country_code;
        delete updatedFields.phone_number;
        
        const { sports, ...userFields } = updatedFields;

        const userData = {...userFields, updatedAt: new Date()}
        
        // Update basic user fields
        if (Object.keys(userFields).length > 0) {
            await this.userRepository.updateUser(userId, userData);
        }
    
        // Update sports if provided
        if (Array.isArray(sports)) {
            await this.userRepository.updateUserSports(userId, sports);
        }
    
        return true;
    }   
}