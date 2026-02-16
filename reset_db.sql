-- ATTENZIONE: Questo comando cancella TUTTO lo storico (assegnazioni attive, rientri, storico).
-- I territori rimarranno, ma torneranno tutti in stato "Disponibile".

-- 1. Cancella tutte le righe dalla tabella assegnazioni (e resetta l'ID autoincrementale se supportato)
TRUNCATE TABLE assegnazioni RESTART IDENTITY CASCADE;

-- 2. Resetta lo stato di tutti i territori a "Disponibile"
-- (Manteniamo last_return_date attuale come riferimento per la "vecchiaia" del territorio, 
-- oppure puoi impostarlo a NULL se vuoi resettare anche la data di ultima lavorazione)
UPDATE territori 
SET is_available = true;

-- Opzionale: Se vuoi resettare anche la data di ultima lavorazione (per farli sembrare nuovi):
-- UPDATE territori SET is_available = true, last_return_date = NULL;
