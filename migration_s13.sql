-- Esegui questo script nell'editor SQL di Supabase

-- 1. Aggiungi colonne per il tracciamento S-13
ALTER TABLE assegnazioni 
ADD COLUMN s13_assign_marked BOOLEAN DEFAULT FALSE,
ADD COLUMN s13_return_marked BOOLEAN DEFAULT FALSE;

-- 2. (Opzionale) Aggiorna i record esistenti come "già fatti" per non intasare la coda
-- Se vuoi che la coda parta vuota, esegui anche queste righe:
UPDATE assegnazioni 
SET s13_assign_marked = TRUE, 
    s13_return_marked = TRUE 
WHERE TRUE;
