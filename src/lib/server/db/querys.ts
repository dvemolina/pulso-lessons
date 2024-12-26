import { eq } from "drizzle-orm";
import { db } from ".";
import { ageGroups, countries, resorts, skillLevels, sports } from "./schemas/normalized";

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

export async function getAllAgeGroups() {
    return await db.select().from(ageGroups);
}

export async function getAllSkillLevels() {
    return await db.select().from(skillLevels);
}
