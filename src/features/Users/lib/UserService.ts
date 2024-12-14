import type { InsertUser } from "$src/lib/server/db/schemas/users";
import { UserRepository } from "./UserRepository";



export class UserService {
    private userRepository = new UserRepository()

    async registerUser(userData: InsertUser) {
        const emailExists = await this.userRepository.findUserByEmail(userData.email);
        console.log('Log for emailExists: ', emailExists)
       const createdUser = await this.userRepository.createUser(userData)
        console.log('User Created Successfully: ', createdUser)
        return createdUser
    }

}