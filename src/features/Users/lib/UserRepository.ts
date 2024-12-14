import {users, type InsertUser} from "$src/lib/server/db/schemas/users";
import { db } from "$src/lib/server/db";
import { eq } from "drizzle-orm";

export class UserRepository {

    async createUser(userData: InsertUser) {
        console.log('REPOSITORY DATA VALUES: ',  userData)
        return await db.insert(users).values(userData)
    }

    async findUserByEmail(email: string) {
        const result =  await db.query.users.findFirst({
            where: eq(users.email, email)
        })
        return result
    }
}