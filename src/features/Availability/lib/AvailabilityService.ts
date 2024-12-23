import type { Availability, InsertAvailability } from "$src/lib/server/db/schemas/availability";
import { AvailabilityRepository } from "./AvailabilityRepository";


export class AvailabilityService {
    private availabilityRepository = new AvailabilityRepository();

    async getAvailabilityByUserId(userId: number): Promise<Availability> {
        return await this.availabilityRepository.getAvailabilityByUserId(userId);
    }

    async createAvailability(availabilityData: InsertAvailability): Promise<Availability> {
        return await this.availabilityRepository.createAvailability(availabilityData);
    }

    async updateAvailability(availabilityId: number, updatedFields: Record<string, never>) {
        return await this.availabilityRepository.updateAvailabilityById(availabilityId, updatedFields);
    }
}