CREATE TABLE IF NOT EXISTS "lessons" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"is_base_lesson" boolean DEFAULT false NOT NULL,
	"user_id" integer,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"resort_id" integer,
	"sport_id" integer,
	"time_unit" varchar NOT NULL,
	"min_time_unit" integer NOT NULL,
	"max_time_unit" integer,
	"min_students" integer,
	"max_students" integer,
	"min_skill_id" integer NOT NULL,
	"max_skill_id" integer,
	"min_age_group_id" integer NOT NULL,
	"max_age_group_id" integer,
	"pricing_mode_id" integer NOT NULL,
	"currency_id" integer NOT NULL,
	"base_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "age_groups" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"age_group" varchar NOT NULL,
	CONSTRAINT "age_groups_age_group_unique" UNIQUE("age_group")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pricing_multipliers" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"pricing_multiplier" varchar NOT NULL,
	CONSTRAINT "pricing_multipliers_pricing_multiplier_unique" UNIQUE("pricing_multiplier")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_levels" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"skill_level" varchar NOT NULL,
	CONSTRAINT "skill_levels_skill_level_unique" UNIQUE("skill_level")
);
--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'availability_slots'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "availability_slots" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "countries" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "currencies" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "languages" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "resorts" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "roles" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sports" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "profile_image" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_resort_id_resorts_id_fk" FOREIGN KEY ("resort_id") REFERENCES "public"."resorts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_sport_id_sports_id_fk" FOREIGN KEY ("sport_id") REFERENCES "public"."sports"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_min_skill_id_skill_levels_id_fk" FOREIGN KEY ("min_skill_id") REFERENCES "public"."skill_levels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_max_skill_id_skill_levels_id_fk" FOREIGN KEY ("max_skill_id") REFERENCES "public"."skill_levels"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_min_age_group_id_age_groups_id_fk" FOREIGN KEY ("min_age_group_id") REFERENCES "public"."age_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_max_age_group_id_age_groups_id_fk" FOREIGN KEY ("max_age_group_id") REFERENCES "public"."age_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_pricing_mode_id_pricing_multipliers_id_fk" FOREIGN KEY ("pricing_mode_id") REFERENCES "public"."pricing_multipliers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lessons" ADD CONSTRAINT "lessons_currency_id_currencies_id_fk" FOREIGN KEY ("currency_id") REFERENCES "public"."currencies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
