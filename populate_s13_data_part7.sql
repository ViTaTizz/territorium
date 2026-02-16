-- PULIZIA PER I TERRITORI 61-64
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 61 AND 64);

-- RESETTA STATO TERRITORI 61-64
UPDATE territori SET is_available = true WHERE number::int BETWEEN 61 AND 64;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)

-- T61: Chavarria Evelyn (29/10/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Chavarria Evelyn', '2025-10-29', NULL, false, true, false 
FROM territori WHERE number = '61';
UPDATE territori SET last_return_date = '2025-06-12', is_available = false WHERE number = '61';

-- T62: Chavarria Antonio (01/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Chavarria Antonio', '2025-09-01', '2025-09-30', true, true, true 
FROM territori WHERE number = '62';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '62';

-- T63: Bosso Rosalia (05/10/25 - 31/10/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Bosso Rosalia', '2025-10-05', '2025-10-31', true, true, true 
FROM territori WHERE number = '63';
UPDATE territori SET last_return_date = '2025-10-31', is_available = true WHERE number = '63';

-- T64: Driusso Mauro (03/07/25 - 20/07/25) | Bosso Rosalia (14/11/25 - 18/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Driusso Mauro', '2025-07-03', '2025-07-20', true, true, true 
FROM territori WHERE number = '64';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Bosso Rosalia', '2025-11-14', '2026-01-18', true, true, true 
FROM territori WHERE number = '64';
UPDATE territori SET last_return_date = '2026-01-18', is_available = true WHERE number = '64';
