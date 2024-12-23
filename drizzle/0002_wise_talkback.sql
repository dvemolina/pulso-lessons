CREATE TABLE IF NOT EXISTS "availability" (
	"id" integer PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"season_start" varchar(12) NOT NULL,
	"season_end" varchar(12) NOT NULL,
	"day_start" varchar(5) NOT NULL,
	"day_end" varchar(5) NOT NULL,
	"week_days" varchar[] NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "profile_image" SET DEFAULT '/favicon.png';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "availability" ADD CONSTRAINT "availability_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
