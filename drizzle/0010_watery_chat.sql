ALTER TABLE "currencies" ADD COLUMN "code" varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_code_unique" UNIQUE("code");