import { boolean, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";
import { ageGroups, currencies, pricingMultipliers, resorts, skillLevels, sports } from "./normalized";

export const lessons = pgTable('lessons', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity({ name: "lessons_id_sequence", startWith: 1, increment: 1, cache: 1 }),
    isBaseLesson: boolean('is_base_lesson').default(false).notNull(),
    userId: integer('user_id').references(() => users.id, {onDelete: "cascade"}),
    title: text('title').notNull(),
    description: text('description').notNull(),
    resortId: integer('resort_id').references(() => resorts.id, {onDelete: 'cascade'}),
    sports: integer('sport_id').references(() => sports.id),
    timeUnit: varchar('time_unit').notNull(),
    minTimeUnit: integer('min_time_unit').notNull(),
    maxTimeUnit: integer('max_time_unit'),
    minStudents: integer('min_students'),
    maxStudents: integer('max_students'),
    minSkillId: integer('min_skill_id').notNull().references(() => skillLevels.id),
    maxSkillId: integer('max_skill_id').references(() => skillLevels.id),
    minAgeGroupId: integer('min_age_group_id').notNull().references(() => ageGroups.id),
    maxAgeGroupId: integer('max_age_group_id').references(() => ageGroups.id),
    pricingModeId: integer('pricing_mode_id').notNull().references(() => pricingMultipliers.id),
    currencyId: integer('currency_id').notNull().references(() => currencies.id),
    basePrice: integer('base_price').notNull(),
})

export const lessonSports = pgTable('lesson_sports', {
	lessonId: integer('lesson_id').notNull().references(() => lessons.id),
	sportId: integer('sports_id').notNull().references(() => sports.id)
})

export type InsertLessonBasics = typeof lessons.$inferInsert;