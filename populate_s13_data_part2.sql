-- PULIZIA PER I TERRITORI 18-20
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 18 AND 20);

-- RESETTA STATO TERRITORI 18-20
UPDATE territori SET is_available = true WHERE number::int BETWEEN 18 AND 20;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)

-- T18: Marisa Arneris (13/09/25 - 17/09/25) | Roberto Ceretto (03/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Arneris Marisa', '2025-09-13', '2025-09-17', true, true, true 
FROM territori WHERE number = '18';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Roberto', '2026-02-03', NULL, false, true, false 
FROM territori WHERE number = '18';
UPDATE territori SET last_return_date = '2025-09-17', is_available = false WHERE number = '18';

-- T19: Marco Conte (29/10/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Conte Marco', '2025-10-29', NULL, false, true, false 
FROM territori WHERE number = '19';
UPDATE territori SET last_return_date = '2025-08-15', is_available = false WHERE number = '19';

-- T20: Federico Giraudo (03/08/25 - 31/08/25) | Federico Giraudo (01/09/25 - 21/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giraudo Federico', '2025-08-03', '2025-08-31', true, true, true 
FROM territori WHERE number = '20';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giraudo Federico', '2025-09-01', '2025-09-21', true, true, true 
FROM territori WHERE number = '20';
UPDATE territori SET last_return_date = '2025-09-21', is_available = true WHERE number = '20';
