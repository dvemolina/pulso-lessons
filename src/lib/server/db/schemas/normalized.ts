import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({startWith: 1, increment: 1}),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length:2 }).notNull() //Lowercase Letters
  });

  export const countries = pgTable("countries", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({startWith: 1, increment: 1}),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length: 2 }).notNull(), //Uppercase Letter
  });

  export const countryLanguages = pgTable("country_languages", {
    countryId: integer("country_id").notNull().references(() => countries.id),
    languageId: integer("language_id").notNull().references(() => languages.id),
    code: varchar('code', { length: 5 }).notNull() // aa-AA format
  });
