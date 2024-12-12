import { pgTable, text, integer, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity().unique(),
	name: text('name').notNull(),
	surname: text('surname').notNull(),
	email: varchar('email',{ length: 254 }).notNull().unique(),
	phone: varchar('phone',{ length: 19 }),
	password: varchar('password', {length: 255}),
	profileImage: varchar('profile_image', {length: 255}),
	age: integer('age'),
	isActive: boolean("is_active").notNull().default(true),
	isVerified: boolean('is_verified').notNull().default(false),
	qualification: varchar('qualification_file', { length: 255 }),

});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export type Session = typeof session.$inferSelect;

export type User = typeof users.$inferSelect;
