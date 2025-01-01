ALTER TABLE "lesson_sports" RENAME COLUMN "sports_id" TO "sport_id";--> statement-breakpoint
ALTER TABLE "lesson_sports" DROP CONSTRAINT "lesson_sports_sports_id_sports_id_fk";
--> statement-breakpoint
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_sport_id_sports_id_fk";
--> statement-breakpoint
ALTER TABLE "lesson_sports" ADD CONSTRAINT "lesson_sports_sport_id_sports_id_fk" FOREIGN KEY ("sport_id") REFERENCES "public"."sports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" DROP COLUMN "sport_id";