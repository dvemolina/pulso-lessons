CREATE TABLE "lesson_sports" (
	"lesson_id" integer NOT NULL,
	"sports_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "lesson_sports" ADD CONSTRAINT "lesson_sports_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_sports" ADD CONSTRAINT "lesson_sports_sports_id_sports_id_fk" FOREIGN KEY ("sports_id") REFERENCES "public"."sports"("id") ON DELETE no action ON UPDATE no action;