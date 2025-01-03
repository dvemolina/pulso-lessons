import { eq } from "drizzle-orm";
import { db } from ".";
import { ageGroups, countries, currencies, languages, pricingModes, resorts, skillLevels, sports, timeUnits } from "./schemas/normalized";

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

export async function getAllCurrencies() {
    return await db.select().from(currencies);
}

export async function getAllTimeUnits() {
    return await db.select().from(timeUnits)
}

export async function getAllPricingModes() {
    return await db.select().from(pricingModes)
}

export async function getAllLanguages() {
    return await db.select().from(languages)
}
