import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "../helpers";


export const availability = pgTable('availability', {
    id: integer('id').generatedAlwaysAsIdentity({ name: "availability_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    userId: integer('userId').references(() => users.id).notNull(),
    seasonStart: varchar('season_start', {length: 12}).notNull(),
    seasonEnd: varchar('season_end', {length: 12}).notNull(),
    dayStart: varchar('day_start', {length: 5}).notNull(),
    dayEnd: varchar('day_end', {length: 5}).notNull(),
    weekDays: integer('week_days').array().notNull(),
    ...timestamps
})

export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;