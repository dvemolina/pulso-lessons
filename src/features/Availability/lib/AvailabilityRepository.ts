import { db } from "$src/lib/server/db";
import { and, eq, inArray } from "drizzle-orm";
import { availability, availabilitySlots, type Availability, type InsertAvailability, type InsertSlot, type Slot } from "$src/lib/server/db/schemas/availability";



export class AvailabilityRepository {

    async getAvailabilityByUserId(userId: number): Promise<Availability> {
        const result = await db.select().from(availability).where(eq(availability.userId, userId));
        return result[0];
    }

    async insertAvailability(availabilityData: InsertAvailability): Promise<Availability> {
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

    async getAvailabilitySlots(availabilityId: number): Promise<Slot[]> {
       const result =  await db.select().from(availabilitySlots).where(eq(availabilitySlots.availabilityId, availabilityId));
       return result;
    }

    async insertAvailabilitySlots(slotsToInsert: InsertSlot[]) {
        await db.insert(availabilitySlots).values(slotsToInsert)
        return slotsToInsert.length;
    }

    async deleteSpecificAvailabilitySlots(availabilityId: number, slotsToDelete: Slot[]) {
        await db.delete(availabilitySlots).where(
            and(
                eq(availabilitySlots.availabilityId, availabilityId),
                inArray(availabilitySlots.id, slotsToDelete.map(slot => slot.id))
            )
        );
    }
}