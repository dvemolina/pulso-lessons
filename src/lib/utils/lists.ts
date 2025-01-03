import { getAllAgeGroups, getAllCountries, getAllCurrencies, getAllLanguages, getAllPricingModes, getAllSkillLevels, getAllSkiResorts, getAllSports, getAllTimeUnits } from "../server/db/referenceData";

export async function fetchAllLists() {
    return {
        resorts: await getAllSkiResorts(),
        countries: await getAllCountries(),
        sports: await getAllSports(),
        ageGroups: await getAllAgeGroups(),
        skillLevels: await getAllSkillLevels(),
        currencies: await getAllCurrencies(),
        timeUnits: await getAllTimeUnits(),
        pricingModes: await getAllPricingModes(),
        languages: await getAllLanguages(),
    };
}