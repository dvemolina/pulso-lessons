import {users, userSports, type InsertUser, type User} from "$src/lib/server/db/schemas/users";
import { db } from "$src/lib/server/db";
import { eq } from "drizzle-orm";



export class UserRepository {

    async createUser(signupData: InsertUser): Promise<User> {
        const result = await db.insert(users).values(signupData).returning();
        return result[0];
    }
    
    async updateUser(userId: number, updatedFields: Record<string, never>) {
        const result = await db.update(users).set(updatedFields).where(eq(users.id, userId)).returning();
        return result[0];
    }

    async findUserByEmail(email: string) {
        const result =  await db.select().from(users).where(eq(users.email, email));
        return result[0];
    }

    async updateUserSports(userId: number, sports: number[]) {
        // Delete existing sports for the user
        await db.delete(userSports).where(eq(userSports.userId, userId));
    
        // Insert new sports
        if (sports.length > 0) {
            const newSports = sports.map((sportId) => ({
                userId: userId,
                sportId: sportId,
            }));
    
            await db.insert(userSports).values(newSports);
        }
    }

    async getUserById(userId: number) {
        const result = await db.select().from(users).where(eq(users.id, userId));
        return result[0]
    }

    async getUserSports(userId: number): Promise<number[]> {
        const sports = await db
            .select()
            .from(userSports)
            .where(eq(userSports.userId, userId));
    
        return sports.map((s) => s.sportId) ;
    }

}