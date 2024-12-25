import type { Availability, InsertAvailability } from "$src/lib/server/db/schemas/availability";
import { AvailabilityRepository } from "./AvailabilityRepository";
import { generateAvailabilitySlots, prepareSlotsToInsert } from "./utils";


export class AvailabilityService {
    private availabilityRepository = new AvailabilityRepository();

    async getAvailabilityByUserId(userId: number): Promise<Availability> {
        return await this.availabilityRepository.getAvailabilityByUserId(userId);
    }

    async createAvailability(availabilityData: InsertAvailability): Promise<number> {
        const availability = await this.availabilityRepository.insertAvailability(availabilityData);
        const slots = generateAvailabilitySlots(availability);
        
        return await this.createAvailabilitySlots(availability.id, slots);
    }

    async updateAvailability(availabilityId: number, updatedFields: Record<string, unknown>): Promise<{kept: number, added: number, deleted: number}> {
        const updates = {...updatedFields, updatedAt: new Date()}
        const newAvailability =  await this.availabilityRepository.updateAvailabilityById(availabilityId, updates);
         
        const result = await this.updateAvailabilitySlots(availabilityId, newAvailability)
        return result
       
    }
    async createAvailabilitySlots(availabilityId: number, slots: { date: string; slotStart: string; slotEnd: string }[]) {
        
        const slotsToInsert = slots.map(slot => ({
            availabilityId,
            date: slot.date,
            slotStart: slot.slotStart,
            slotEnd: slot.slotEnd,
            statusId: 1, // Default to "free"
        }));
    
        return await this.availabilityRepository.insertAvailabilitySlots(slotsToInsert);
    }

    async updateAvailabilitySlots(availabilityId: number, newAvailability: {seasonStart: string, seasonEnd: string, dayStart: string, dayEnd: string, weekDays: number[]}) {
        // Fetch existing slots for this availability
        const existingSlots = await this.availabilityRepository.getAvailabilitySlots(availabilityId)
    
        // Generate new slots
        const newSlots = await generateAvailabilitySlots(newAvailability);
    
        // Separate into slots to keep, add, or delete
        const slotsToKeep = existingSlots.filter(slot =>
            newSlots.some(newSlot =>
                slot.date === newSlot.date && slot.slotStart === newSlot.slotStart && slot.statusId !== 2 && slot.statusId !== 3 // Do not delete booked/busy slots
            )
        );
    
        const slotsToAdd = newSlots.filter(newSlot =>
            !existingSlots.some(slot => slot.date === newSlot.date && slot.slotStart === newSlot.slotStart)
        );
    
        const slotsToDelete = existingSlots.filter(slot =>
            !newSlots.some(newSlot => slot.date === newSlot.date && slot.slotStart === newSlot.slotStart) &&
            slot.statusId !== 2 && slot.statusId !== 3 // Do not delete booked/busy slots
        );
    
        // Delete old slots (excluding booked)
        await this.availabilityRepository.deleteSpecificAvailabilitySlots(availabilityId, slotsToDelete)
        // Prepare slots to insert
        const slotsToInsert = prepareSlotsToInsert(availabilityId, slotsToAdd)
        // Insert slots
        await this.availabilityRepository.insertAvailabilitySlots(slotsToInsert)
    
        return {
            kept: slotsToKeep.length,
            added: slotsToAdd.length,
            deleted: slotsToDelete.length,
        };
    }
    
}