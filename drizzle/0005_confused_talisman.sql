-- Custom SQL migration file, put you code below! --
-- Step 1: Drop the existing primary key constraint (if necessary)
ALTER TABLE availability
    DROP CONSTRAINT IF EXISTS availability_pkey;

ALTER TABLE availability
    DROP CONSTRAINT IF EXISTS availability_userId_users_id_fk;

-- Step 2: Alter the `id` column to use GENERATED ALWAYS AS IDENTITY
ALTER TABLE availability
    ALTER COLUMN id SET DATA TYPE INTEGER;
    
-- Drop any existing default sequence for the `id` column
ALTER TABLE availability
    ALTER COLUMN id DROP DEFAULT;

-- Step 3: Add the GENERATED ALWAYS AS IDENTITY
ALTER TABLE availability
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY 
    (START WITH 1 INCREMENT BY 1 MINVALUE 1 CACHE 1);

-- Step 4: Recreate the primary key constraint
ALTER TABLE availability
    ADD PRIMARY KEY (id);
