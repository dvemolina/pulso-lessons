import type { Availability } from "$src/lib/server/db/schemas/availability";
import { AvailabilityRepository } from "./AvailabilityRepository";


export class AvailabilityService {
    private availabilityRepository = new AvailabilityRepository();

    async getAvailabilityByUserId(userId: number): Promise<Availability> {
        return await this.availabilityRepository.getAvailabilityByUserId(userId);
    }
}