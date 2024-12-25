CREATE TABLE IF NOT EXISTS "availability_slots" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"availability_id" integer NOT NULL,
	"date" varchar NOT NULL,
	"start_time" varchar NOT NULL,
	"end_time" varchar NOT NULL,
	"status_id" smallint NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slot_status" (
	"id" smallint GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"status" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resorts" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"resort" varchar(100) NOT NULL,
	"country_id" integer NOT NULL,
	CONSTRAINT "resorts_resort_unique" UNIQUE("resort")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sports" (
	"id" integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	"sport" varchar(100) NOT NULL,
	CONSTRAINT "sports_sport_unique" UNIQUE("sport")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_sports" (
	"user_id" integer NOT NULL,
	"sports_id" integer NOT NULL
);


--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_availability_id_fkey" FOREIGN KEY ("availability_id") REFERENCES "public"."availability"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "public"."slot_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "resorts" ADD CONSTRAINT "resorts_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sports" ADD CONSTRAINT "user_sports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_sports" ADD CONSTRAINT "user_sports_sports_id_sports_id_fk" FOREIGN KEY ("sports_id") REFERENCES "public"."sports"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability" ADD CONSTRAINT "availability_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_resort_id_resorts_id_fk" FOREIGN KEY ("resort_id") REFERENCES "public"."resorts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
