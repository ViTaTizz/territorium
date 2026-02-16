-- PULIZIA PER I TERRITORI 57-60
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 57 AND 60);

-- RESETTA STATO TERRITORI 57-60
UPDATE territori SET is_available = true WHERE number::int BETWEEN 57 AND 60;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)

-- T57: Arneris Marisa (01/09/25 - 05/09/25) | Ceretto Roberto (20/12/25 - 11/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Arneris Marisa', '2025-09-01', '2025-09-05', true, true, true 
FROM territori WHERE number = '57';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Roberto', '2025-12-20', '2026-01-11', true, true, true 
FROM territori WHERE number = '57';
UPDATE territori SET last_return_date = '2026-01-11', is_available = true WHERE number = '57';

-- T58: Imerone Alessandro (01/10/25 - 03/12/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Imerone Alessandro', '2025-10-01', '2025-12-03', true, true, true 
FROM territori WHERE number = '58';
UPDATE territori SET last_return_date = '2025-12-03', is_available = true WHERE number = '58';

-- T59: Ceretto Amalia (21/10/25 - 09/11/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Amalia', '2025-10-21', '2025-11-09', true, true, true 
FROM territori WHERE number = '59';
UPDATE territori SET last_return_date = '2025-11-09', is_available = true WHERE number = '59';

-- T60: Arena Carmela (07/09/25 - 11/09/25) | Driusso Mauro (18/01/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Arena Carmela', '2025-09-07', '2025-09-11', true, true, true 
FROM territori WHERE number = '60';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Driusso Mauro', '2026-01-18', NULL, false, true, false 
FROM territori WHERE number = '60';
UPDATE territori SET last_return_date = '2025-09-11', is_available = false WHERE number = '60';
