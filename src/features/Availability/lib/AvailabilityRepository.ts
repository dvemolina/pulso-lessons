import { db } from "$src/lib/server/db";
import { eq } from "drizzle-orm";
import { availability, type Availability } from "$src/lib/server/db/schemas/availability";


export class AvailabilityRepository {

    async getAvailabilityByUserId(userId: number): Promise<Availability> {
        const result = await db.select().from(availability).where(eq(availability.userId, userId));
        return result[0];
    }
}