import { db } from "$src/lib/server/db";
import type { User } from "$src/lib/server/db/schemas/users";


export class FinderRepository {

    async findAvailableInstructors (sportId: number, resortId: number, dateRange: string[], students: number) {
        //Find Services that match the Resort Id
    }

}