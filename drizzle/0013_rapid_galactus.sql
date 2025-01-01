ALTER TABLE "pricing_multipliers" RENAME TO "pricing_modes";--> statement-breakpoint
ALTER TABLE "pricing_modes" RENAME COLUMN "pricing_multiplier" TO "pricing_mode";--> statement-breakpoint
ALTER TABLE "pricing_modes" DROP CONSTRAINT "pricing_multipliers_pricing_multiplier_unique";--> statement-breakpoint
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_pricing_mode_id_pricing_multipliers_id_fk";
--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_pricing_mode_id_pricing_modes_id_fk" FOREIGN KEY ("pricing_mode_id") REFERENCES "public"."pricing_modes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pricing_modes" ADD CONSTRAINT "pricing_modes_pricing_mode_unique" UNIQUE("pricing_mode");