import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'languages_id_sequence', startWith: 1, increment: 1 }),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length:2 }).notNull().unique() //aa-AA format
  });

export const countries = pgTable("countries", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'countries_id_sequence', startWith: 1, increment: 1 }),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 2 }).notNull().unique(), //Uppercase Letter
});

export const currencies = pgTable("currencies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity({ name: 'currencies_id_sequence', startWith: 1, increment: 1 }),
  currency: varchar('currency', { length: 50 }).notNull(),
  code: varchar('code', {length: 3}).notNull().unique()
})

export const roles = pgTable('roles', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'roles_id_sequence', startWith: 1, increment: 1 }),
  role: varchar('name', { length: 50 }).notNull().unique(), 
});

export const resorts = pgTable('resorts', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'resorts_id_sequence', startWith: 1, increment: 1 }),
  resort: varchar('resort', {length: 100}).notNull().unique(),
  countryId: integer('country_id').references(() => countries.id).notNull()
})

export const sports = pgTable('sports', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'sports_id_sequence', startWith: 1, increment: 1 }),
  sport: varchar('sport', { length: 100 }).notNull().unique()
})

export const skillLevels = pgTable('skill_levels', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'skill_levels_id_sequence', startWith: 1, increment: 1 }),
  skillLevel: varchar('skill_level').notNull().unique()
})

export const ageGroups = pgTable('age_groups', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'age_groups_id_sequence', startWith: 1, increment: 1 }),
  ageGroup: varchar('age_group').notNull().unique(),
  minAge: integer('min_age'),
  maxAge: integer('max_age')
})

export const pricingModes = pgTable('pricing_modes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'pricing_modes_id_sequence', startWith: 1, increment: 1 }),
  pricingMode: varchar('pricing_mode').notNull().unique()
})

export const timeUnits = pgTable('time_units', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: 'time_units_id_sequence', startWith: 1, increment: 1 }),
  timeUnit: varchar('time_unit').notNull().unique()
})

export type Resorts = typeof resorts.$inferSelect;
export type Languages = typeof languages.$inferSelect;
export type Countries = typeof countries.$inferSelect;
export type Currencies = typeof currencies.$inferSelect;
export type SkillLevels = typeof skillLevels.$inferSelect;
export type AgeGroups = typeof ageGroups.$inferSelect;
export type Sports = typeof sports.$inferSelect;
export type PricingModes = typeof pricingModes.$inferSelect;