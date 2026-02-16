-- Disabilita temporaneamente la sicurezza sui dati (RLS)
-- per verificare se l'errore 403 sparisce.
ALTER TABLE territori DISABLE ROW LEVEL SECURITY;
ALTER TABLE assegnazioni DISABLE ROW LEVEL SECURITY;

-- Assicurati anche che i permessi di scrittura siano concessi
GRANT ALL ON TABLE territori TO authenticated;
GRANT ALL ON TABLE territori TO anon;
GRANT ALL ON TABLE territori TO service_role;

GRANT ALL ON TABLE assegnazioni TO authenticated;
GRANT ALL ON TABLE assegnazioni TO anon;
GRANT ALL ON TABLE assegnazioni TO service_role;
