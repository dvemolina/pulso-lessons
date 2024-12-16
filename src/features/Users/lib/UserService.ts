import type { InsertUser, User } from "$src/lib/server/db/schemas/users";
import { UserRepository } from "./UserRepository";
import { hashPassword } from "$src/lib/utils/bcrypt";
import type { UserSignup } from "./userValidations";
import { sendClientSignupMail } from "$src/lib/nodemailer/nodemailer";
import { redirect } from "@sveltejs/kit";


export class UserService {
    private userRepository = new UserRepository()

    async registerUserWithPassword(signupData: UserSignup): Promise<User> {
        const emailExists = await this.userRepository.findUserByEmail(signupData.email);
      
        if(emailExists) {
           throw new Error('EmailExists')
        }

        if (signupData.phone && signupData.country_code) {
            const formattedPhone = `${signupData.country_code}${signupData.phone}`;
            signupData.phone = formattedPhone
        }
        const hashedPassword = await hashPassword(signupData.password);

        signupData.password = hashedPassword

        delete signupData.country_code
        delete signupData.confirm_password

        const userData: InsertUser = {...signupData, role: 1}

        try {
            const createdUser = await this.userRepository.createUser(userData)
            console.log('User Created Successfully: ', createdUser)

            if (createdUser) {
                await sendClientSignupMail(createdUser.name, createdUser.email)
            }

            //CREATE THE SESSION
            //SET THE COOKIES
            
            redirect(302, "/auth/signup/success") 
        } catch (error) {
            console.error('Something went wrong when Creating the User', error)
            throw new Error('Algo falló intentando crear la cuenta de Usuario')
        }  
    }

}