-- Custom SQL migration file, put you code below! --
-- Create the custom sequence if it doesn't already exist
CREATE SEQUENCE IF NOT EXISTS availability_id_sequence
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    CACHE 1;

-- Alter the id column to use the custom sequence
ALTER TABLE availability
    ALTER COLUMN id SET DEFAULT nextval('availability_id_sequence'::regclass);

-- Optionally: set the sequence to the current maximum id to avoid conflicts
SELECT setval('availability_id_sequence', (SELECT MAX(id) FROM availability));
