import {users, type InsertUser, type User} from "$src/lib/server/db/schemas/users";
import { db } from "$src/lib/server/db";
import { eq } from "drizzle-orm";



export class UserRepository {

    async createUser(signupData: InsertUser): Promise<User> {
        const result = await db.insert(users).values(signupData).returning();
        return result[0];
    }

    async findUserByEmail(email: string) {
        const result =  await db.select().from(users).where(eq(users.email, email))
        return result[0];
    }

    async getUserById(userId: number): Promise<User> {
        const result = await db.select().from(users).where(eq(users.id, userId));
        return result[0];
    }
}