import type { User } from "$src/lib/server/db/schemas/users";
import { UserRepository } from "./UserRepository";


export class UserService {
    private userRepository = new UserRepository()

    async registerUser(signupData: Omit<User, 'id'>): Promise<User> {
        const emailExists = await this.userRepository.findUserByEmail(signupData.email);
        console.log('Log for emailExists: ', emailExists)
       const createdUser = await this.userRepository.createUser(signupData)
        console.log('User Created Successfully: ', createdUser)
        return createdUser
    }

}