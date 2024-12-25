import { foreignKey, integer, pgTable, smallint, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "./helpers";


export const availability = pgTable('availability', {
    id: integer('id').generatedAlwaysAsIdentity({ name: "availability_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    seasonStart: varchar('season_start', {length: 12}).notNull(),
    seasonEnd: varchar('season_end', {length: 12}).notNull(),
    dayStart: varchar('day_start', {length: 5}).notNull(),
    dayEnd: varchar('day_end', {length: 5}).notNull(),
    weekDays: integer('week_days').array().notNull(),
    ...timestamps
})

export const availabilitySlots = pgTable("availability_slots", {
    id: integer("id").generatedAlwaysAsIdentity({
        startWith: 1, 
        increment: 1
    }),
    availabilityId: integer("availability_id").notNull(),
    date: varchar("date").notNull(),
    slotStart: varchar("start_time").notNull(),
    slotEnd: varchar("end_time").notNull(),
    statusId: smallint("status_id").notNull(),
    ...timestamps
},
(table) => {
    return {
        availabilitySlotsAvailabilityIdFkey: foreignKey({
            columns: [table.availabilityId],
            foreignColumns: [availability.id],
            name: "availability_slots_availability_id_fkey"
        }).onDelete("cascade"),
        availabilitySlotsStatusIdFkey: foreignKey({
            columns: [table.statusId],
            foreignColumns: [slotStatus.id],
            name: "availability_slots_status_id_fkey"
        }),
    };
});

// Table: slot_status
export const slotStatus = pgTable("slot_status", {
    id: smallint("id").primaryKey().generatedAlwaysAsIdentity({
        name: "slot_status_id_seq",
        startWith: 1,
        increment: 1
    }),
    status: varchar("status", { length: 50 }).notNull(),
});

export type Availability = typeof availability.$inferSelect;
export type InsertAvailability = typeof availability.$inferInsert;
export type Slot = typeof availabilitySlots.$inferSelect;
export type InsertSlot = typeof availabilitySlots.$inferInsert