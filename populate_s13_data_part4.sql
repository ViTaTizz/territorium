-- PULIZIA PER I TERRITORI 39-40
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 39 AND 40);

-- RESETTA STATO TERRITORI 39-40
UPDATE territori SET is_available = true WHERE number::int BETWEEN 39 AND 40;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)

-- T39: Floris Alessia (14/10/25 - 11/02/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Floris Alessia', '2025-10-14', '2026-02-11', true, true, true 
FROM territori WHERE number = '39';
UPDATE territori SET last_return_date = '2026-02-11', is_available = true WHERE number = '39';

-- T40: Floris Alessia (18/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Floris Alessia', '2025-09-18', '2025-09-30', true, true, true 
FROM territori WHERE number = '40';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '40';
