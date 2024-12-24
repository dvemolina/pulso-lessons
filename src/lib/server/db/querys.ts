import { eq } from "drizzle-orm";
import { db } from ".";
import { countries, resorts, sports } from "./schemas/normalized";

export async function getAllSkiResorts() {
    return await db.select().from(resorts);
}

export async function getSkiResortsByCountry(countryId: number) {
    return await db.select().from(resorts).where(eq(countries.id, countryId))
}

export async function getAllCountries() {
    return await db.select().from(countries);
}

export async function getAllSports() {
    return await db.select().from(sports);
}
