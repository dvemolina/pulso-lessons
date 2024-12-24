import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    code: varchar("code", { length:2 }).notNull().unique() //aa-AA format
  });

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  code: varchar("code", { length: 2 }).notNull().unique(), //Uppercase Letter
});

export const currencies = pgTable("currencies", {
  id: serial("id").primaryKey(),
  currency: varchar('currency', { length: 50 }).notNull()
})

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  role: varchar('name', { length: 50 }).notNull().unique(), 
});

export const resorts = pgTable('resorts', {
  id: serial('id').primaryKey(),
  resort: varchar('resort', {length: 100}).notNull().unique(),
  countryId: integer('country_id').references(() => countries.id).notNull()
})

export const sports = pgTable('sports', {
  id: serial('id').primaryKey(),
  sport: varchar('sport', { length: 100 }).notNull().unique()
})

