CREATE TABLE "time_units" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "time_units_id_sequence" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"time_unit" varchar NOT NULL,
	CONSTRAINT "time_units_time_unit_unique" UNIQUE("time_unit")
);
