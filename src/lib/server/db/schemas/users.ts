import { pgTable, text, integer, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';
import { countries, languages, resorts, roles, sports } from './normalized';
import { timestamps } from './helpers';

export const users = pgTable('users', {
	id: integer('id').generatedAlwaysAsIdentity({ name: "users_id_sequence", startWith: 1, increment: 1, minValue: 1,  cache: 1 }).primaryKey(),
	roleId: integer('role_id').references(() => roles.id).notNull(), //Maybe add a Default Role?
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	email: varchar('email',{ length: 254 }).notNull().unique(),
	phone: varchar('phone',{ length: 19 }),
	password: varchar('password', {length: 255}),
	profileImage: varchar('profile_image', {length: 255}).default('/favicon.png').notNull(),
	age: integer('age'),
	isActive: boolean("is_active").notNull().default(true),
	isVerified: boolean('is_verified').notNull().default(false),
	qualification: varchar('qualification_file', { length: 255 }),
	biography: text("biography"),
	nationality: integer("nationality").references(() => countries.id),
	iban: varchar("iban", { length: 50 }),
	resortId: integer('resort_id').references(() => resorts.id),
	...timestamps
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const userLanguages = pgTable("user_languages", {
	userId: integer("user_id").notNull().references(() => users.id),
	languageId: integer("language_id").notNull().references(() => languages.id)
  });

export const userRoles = pgTable('user_roles', {
	userId: integer('user_id').notNull().references(() => users.id),  // Reference to the users table
	roleId: integer('role_id').notNull().references(() => roles.id),  // Reference to the roles table
	assignedAt: timestamp('assigned_at').defaultNow(),  // Timestamp when the role was assigned
})

export const userSports = pgTable('user_sports', {
	userId: integer('user_id').notNull().references(() => users.id),
	sportId: integer('sports_id').notNull().references(() => sports.id)
})

export type Session = typeof session.$inferSelect;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert
