-- Add tags column to territori table
-- We use text[] array type for storing multiple tags
ALTER TABLE territori 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT ARRAY[]::text[];

-- Optional: Update existing records to have empty array if null (though default handles new ones)
UPDATE territori SET tags = ARRAY[]::text[] WHERE tags IS NULL;
