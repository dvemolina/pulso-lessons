import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
    id: serial("id").primaryKey().notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length:2 }).notNull() //Lowercase Letters
  });

export const countries = pgTable("countries", {
  id: serial("id").primaryKey().notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 2 }).notNull(), //Uppercase Letter
});

export const countryLanguages = pgTable("country_languages", {
  countryId: integer("country_id").notNull().references(() => countries.id),
  languageId: integer("language_id").notNull().references(() => languages.id),
  code: varchar('code', { length: 5 }).notNull() // aa-AA format
});

export const currencies = pgTable("currencies", {
  id: serial("id").primaryKey().notNull().unique(),
  currency: varchar('currency', { length: 50 }).notNull()
})

export const roles = pgTable('roles', {
  id: serial('id').primaryKey().notNull().unique(),
  role: varchar('name', { length: 50 }).notNull().unique(), 
});

