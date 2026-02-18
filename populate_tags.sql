-- Query per popolare casualmente i tag dei territori esistenti
-- Copre tutte le possibili combinazioni di: Residenziale, Con cascine, Senza condomini

UPDATE territori
SET tags = CASE floor(random() * 8)::int
    WHEN 0 THEN '{}'::text[] -- Nessun tag
    WHEN 1 THEN ARRAY['Residenziale']
    WHEN 2 THEN ARRAY['Con cascine']
    WHEN 3 THEN ARRAY['Senza condomini']
    WHEN 4 THEN ARRAY['Residenziale', 'Con cascine']
    WHEN 5 THEN ARRAY['Residenziale', 'Senza condomini']
    WHEN 6 THEN ARRAY['Con cascine', 'Senza condomini']
    WHEN 7 THEN ARRAY['Residenziale', 'Con cascine', 'Senza condomini']
    ELSE '{}'::text[]
END;
