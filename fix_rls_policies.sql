-- 1. Abilita esplicitamente RLS (sicurezza a livello di riga)
ALTER TABLE territori ENABLE ROW LEVEL SECURITY;
ALTER TABLE assegnazioni ENABLE ROW LEVEL SECURITY;

-- 2. Crea policy per permettere tutto agli utenti autenticati (chi ha fatto login)
-- Se esistevano già policy simili, potresti ricevere un errore "policy already exists", ignoralo o cancellale prima.

DROP POLICY IF EXISTS "Accesso completo utenti autenticati territori" ON territori;
CREATE POLICY "Accesso completo utenti autenticati territori"
ON territori FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Accesso completo utenti autenticati assegnazioni" ON assegnazioni;
CREATE POLICY "Accesso completo utenti autenticati assegnazioni"
ON assegnazioni FOR ALL TO authenticated
USING (true)
WITH CHECK (true);

-- 3. (Opzionale) Permetti lettura anche agli anonimi se serve, ma per ora teniamo solo autenticati.
