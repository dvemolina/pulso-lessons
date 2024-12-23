import { db } from "$src/lib/server/db";
import { eq } from "drizzle-orm";
import { availability, type Availability, type InsertAvailability } from "$src/lib/server/db/schemas/availability";



export class AvailabilityRepository {

    async getAvailabilityByUserId(userId: number): Promise<Availability> {
        const result = await db.select().from(availability).where(eq(availability.userId, userId));
        return result[0];
    }

    async createAvailability(availabilityData: InsertAvailability): Promise<Availability> {
        const result = await db.insert(availability).values(availabilityData).returning()
        return result[0]
    }
    async updateAvailabilityById(availabilityId:number, updatedAvailability: Record<string, never>) {
        if (Object.keys(updatedAvailability).length === 0) {
            return null;
        }
        const result = await db.update(availability).set(updatedAvailability).where(eq(availability.id, availabilityId)).returning();
        return result[0];
    }
}