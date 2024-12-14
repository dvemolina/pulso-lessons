-- Custom SQL migration file, put you code below! --

-- Step 2: Drop the existing table constraints
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_unique;

-- Step 3: Drop the existing table
DROP TABLE IF EXISTS users CASCADE;

-- Step 4: Create the new table with the desired schema
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (INCREMENT BY 1 MINVALUE 1 START WITH 1 CACHE 1),
	"role" integer NOT NULL,
	"name" text NOT NULL,
	"surname" text NOT NULL,
	"email" varchar(254) NOT NULL,
	"phone" varchar(19),
	"password" varchar(255),
	"profile_image" varchar(255),
	"age" integer,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"qualification_file" varchar(255),
	"biography" text,
	"nationality" integer,
	"iban" varchar(50),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

