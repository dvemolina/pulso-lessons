ALTER TABLE "lessons" DROP CONSTRAINT "lessons_time_unit_time_units_id_fk";
ALTER TABLE "lessons" RENAME COLUMN "time_unit" TO "time_unit_id";
ALTER TABLE "lessons" ALTER COLUMN "time_unit_id" SET DATA TYPE integer USING "time_unit_id"::integer;
ALTER TABLE "lessons"
ADD CONSTRAINT "lessons_time_unit_id_time_units_id_fk"
FOREIGN KEY ("time_unit_id")
REFERENCES "public"."time_units"("id")
ON DELETE NO ACTION
ON UPDATE NO ACTION;
