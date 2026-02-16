-- PULIZIA PER I TERRITORI 41-56
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 41 AND 56);

-- RESETTA STATO TERRITORI 41-56
UPDATE territori SET is_available = true WHERE number::int BETWEEN 41 AND 56;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)

-- T41: Renditore Fabrizio (01/10/25 - 28/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Renditore Fabrizio', '2025-10-01', '2026-01-28', true, true, true 
FROM territori WHERE number = '41';
UPDATE territori SET last_return_date = '2026-01-28', is_available = true WHERE number = '41';

-- T42: Ceretto Roberto (12/12/25 - 20/12/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Roberto', '2025-12-12', '2025-12-20', true, true, true 
FROM territori WHERE number = '42';
UPDATE territori SET last_return_date = '2025-12-20', is_available = true WHERE number = '42';

-- T43: Giraudo Flavio (15/10/25 - 08/02/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giraudo Flavio', '2025-10-15', '2026-02-08', true, true, true 
FROM territori WHERE number = '43';
UPDATE territori SET last_return_date = '2026-02-08', is_available = true WHERE number = '43';

-- T44: Renditore Lucia (01/10/25 - 25/11/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Renditore Lucia', '2025-10-01', '2025-11-25', true, true, true 
FROM territori WHERE number = '44';
UPDATE territori SET last_return_date = '2025-11-25', is_available = true WHERE number = '44';

-- T45: Bertoncello Ivana (04/09/25 - 13/09/25) | Specchio Mariella (31/01/26 - 14/02/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Bertoncello Ivana', '2025-09-04', '2025-09-13', true, true, true 
FROM territori WHERE number = '45';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Specchio Mariella', '2026-01-31', '2026-02-14', true, true, true 
FROM territori WHERE number = '45';
UPDATE territori SET last_return_date = '2026-02-14', is_available = true WHERE number = '45';

-- T46: Vizdoaga Jana (18/10/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Vizdoaga Jana', '2025-10-18', NULL, false, true, false 
FROM territori WHERE number = '46';
UPDATE territori SET is_available = false WHERE number = '46';

-- T47: Palmirotta Loretta (04/10/25 - 31/01/26) | Palmirotta Loretta (31/01/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Palmirotta Loretta', '2025-10-04', '2026-01-31', true, true, true 
FROM territori WHERE number = '47';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Palmirotta Loretta', '2026-01-31', NULL, false, true, false 
FROM territori WHERE number = '47';
UPDATE territori SET last_return_date = '2026-01-31', is_available = false WHERE number = '47';

-- T48: Cribellati Gianfranco (11/09/25 - 30/09/25) | Cribellati Gianfranco (01/10/25 - 02/11/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Cribellati Gianfranco', '2025-09-11', '2025-09-30', true, true, true 
FROM territori WHERE number = '48';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Cribellati Gianfranco', '2025-10-01', '2025-11-02', true, true, true 
FROM territori WHERE number = '48';
UPDATE territori SET last_return_date = '2025-11-02', is_available = true WHERE number = '48';

-- T49: Bertoncello Ivana (13/09/25 - 20/09/25) | Specchio Mariella (14/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Bertoncello Ivana', '2025-09-13', '2025-09-20', true, true, true 
FROM territori WHERE number = '49';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Specchio Mariella', '2026-02-14', NULL, false, true, false 
FROM territori WHERE number = '49';
UPDATE territori SET last_return_date = '2025-09-20', is_available = false WHERE number = '49';

-- T50: Bertoncello Ivana (18/10/25 - 05/11/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Bertoncello Ivana', '2025-10-18', '2025-11-05', true, true, true 
FROM territori WHERE number = '50';
UPDATE territori SET last_return_date = '2025-11-05', is_available = true WHERE number = '50';

-- T51: Monte Domenico (01/09/25 - 20/09/25) | Bertoncello Ivana (13/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Monte Domenico', '2025-09-01', '2025-09-20', true, true, true 
FROM territori WHERE number = '51';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Bertoncello Ivana', '2026-02-13', NULL, false, true, false 
FROM territori WHERE number = '51';
UPDATE territori SET last_return_date = '2025-09-20', is_available = false WHERE number = '51';

-- T52: Zire Naomi (19/10/25 - 15/02/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Zire Naomi', '2025-10-19', '2026-02-15', true, true, true 
FROM territori WHERE number = '52';
UPDATE territori SET last_return_date = '2026-02-15', is_available = true WHERE number = '52';

-- T53: Sabarino Giovanni (01/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Sabarino Giovanni', '2025-09-01', '2025-09-30', true, true, true 
FROM territori WHERE number = '53';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '53';

-- T54: Monte Domenico (13/09/25 - 18/09/25) | Imerone Alessandro (08/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Monte Domenico', '2025-09-13', '2025-09-18', true, true, true 
FROM territori WHERE number = '54';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Imerone Alessandro', '2026-02-08', NULL, false, true, false 
FROM territori WHERE number = '54';
UPDATE territori SET last_return_date = '2025-09-18', is_available = false WHERE number = '54';

-- T55: Giraudo Flavio (01/09/25 - 21/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giraudo Flavio', '2025-09-01', '2025-09-21', true, true, true 
FROM territori WHERE number = '55';
UPDATE territori SET last_return_date = '2025-09-21', is_available = true WHERE number = '55';

-- T56: Ceretto Amalia (24/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Amalia', '2025-09-24', '2025-09-30', true, true, true 
FROM territori WHERE number = '56';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '56';
