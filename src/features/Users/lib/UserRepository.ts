import {users, type User} from "$src/lib/server/db/schemas/users";
import { db } from "$src/lib/server/db";
import { eq } from "drizzle-orm";



export class UserRepository {

    async createUser(signupData: Omit<User, 'id'>): Promise<User> {
        console.log('REPOSITORY DATA VALUES: ',  signupData);
        const result = await db.insert(users).values(signupData).returning();
        return result[0]
    }

    async findUserByEmail(email: string) {
        const result =  await db.query.users.findFirst({
            where: eq(users.email, email)
        })
        return result
    }
}