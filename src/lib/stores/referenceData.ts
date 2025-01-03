// stores/referenceData.ts
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import * as queries from '$lib/server/db/referenceData';
import type { AgeGroups, Countries, Currencies, Languages, PricingModes, Resorts, SkillLevels, Sports, TimeUnits } from '../server/db/schemas/normalized';


const REFERENCE_KEY = 'referenceData';

export function createReferenceStores(){
    return {
        resorts: writable<Resorts[]>([]),
        countries: writable<Countries[]>([]),
        sports: writable<Sports[]>([]),
        ageGroups: writable<AgeGroups[]>([]),
        skillLevels: writable<SkillLevels[]>([]),
        currencies: writable<Currencies[]>([]),
        timeUnits: writable<TimeUnits[]>([]),
        pricingModes: writable<PricingModes[]>([]),
        languages: writable<Languages[]>([])
    };
}

export function setReferenceContext() {
    const stores = createReferenceStores();
    
    async function fetchAll() {
        const data = await Promise.all([
            queries.getAllSkiResorts(),
            queries.getAllCountries(),
            queries.getAllSports(),
            queries.getAllAgeGroups(),
            queries.getAllSkillLevels(),
            queries.getAllCurrencies(),
            queries.getAllTimeUnits(),
            queries.getAllPricingModes(),
            queries.getAllLanguages()
        ]);
        
        stores.resorts.set(data[0]);
        stores.countries.set(data[1]);
        stores.sports.set(data[2]);
        stores.ageGroups.set(data[3]);
        stores.skillLevels.set(data[4]);
        stores.currencies.set(data[5]);
        stores.timeUnits.set(data[6]);
        stores.pricingModes.set(data[7]);
        stores.languages.set(data[8]);
    }
    
    setContext(REFERENCE_KEY, { ...stores, fetchAll });
}

export function getReferenceStores() {
    return getContext(REFERENCE_KEY);
}