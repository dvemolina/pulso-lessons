import { eq } from "drizzle-orm";
import { db } from ".";
import { countries, resorts } from "./schemas/normalized";

export async function getAllSkiResorts() {
    return await db.select().from(resorts);
}

export async function getSkiResortsByCountry(countryId: number) {
    return await db.select().from(resorts).where(eq(countries.id, countryId))
}