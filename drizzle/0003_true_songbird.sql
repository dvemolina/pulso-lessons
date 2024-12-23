ALTER TABLE availability
ALTER COLUMN week_days TYPE integer[]
USING week_days::integer[];