-- PULIZIA PER I TERRITORI 21-38
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 21 AND 38);

-- RESETTA STATO TERRITORI 21-38
UPDATE territori SET is_available = true WHERE number::int BETWEEN 21 AND 38;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)

-- T21: Dario Cona (01/10/25 - 22/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Cona Dario', '2025-10-01', '2026-01-22', true, true, true 
FROM territori WHERE number = '21';
UPDATE territori SET last_return_date = '2026-01-22', is_available = true WHERE number = '21';

-- T22: Amalia Ceretto (18/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Amalia', '2025-09-18', '2025-09-30', true, true, true 
FROM territori WHERE number = '22';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '22';

-- T23: Valentina Egitto (11/12/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Egitto Valentina', '2025-12-11', NULL, false, true, false 
FROM territori WHERE number = '23';
UPDATE territori SET last_return_date = '2025-06-12', is_available = false WHERE number = '23';

-- T24: Rachele Sabarino (29/10/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Sabarino Rachele', '2025-10-29', NULL, false, true, false 
FROM territori WHERE number = '24';
UPDATE territori SET last_return_date = '2025-08-31', is_available = false WHERE number = '24';

-- T25: Dario Cona (03/09/25 - 21/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Cona Dario', '2025-09-03', '2025-09-21', true, true, true 
FROM territori WHERE number = '25';
UPDATE territori SET last_return_date = '2025-09-21', is_available = true WHERE number = '25';

-- T26: Alessandro Berna (15/07/25 - 31/08/25) | Alessia Floris (19/11/25 - 11/02/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Berna Alessandro', '2025-07-15', '2025-08-31', true, true, true 
FROM territori WHERE number = '26';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Floris Alessia', '2025-11-19', '2026-02-11', true, true, true 
FROM territori WHERE number = '26';
UPDATE territori SET last_return_date = '2026-02-11', is_available = true WHERE number = '26';

-- T27: Lucia Renditore (25/11/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Renditore Lucia', '2025-11-25', NULL, false, true, false 
FROM territori WHERE number = '27';
UPDATE territori SET last_return_date = '2025-08-31', is_available = false WHERE number = '27';

-- T28: Marisa Arneris (21/11/25 - 19/12/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Arneris Marisa', '2025-11-21', '2025-12-19', true, true, true 
FROM territori WHERE number = '28';
UPDATE territori SET last_return_date = '2025-12-19', is_available = true WHERE number = '28';

-- T29: Roberto Ceretto (05/10/25 - 26/10/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Roberto', '2025-10-05', '2025-10-26', true, true, true 
FROM territori WHERE number = '29';
UPDATE territori SET last_return_date = '2025-10-26', is_available = true WHERE number = '29';

-- T30: Roberto Ceretto (16/11/25 - 11/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Roberto', '2025-11-16', '2026-01-11', true, true, true 
FROM territori WHERE number = '30';
UPDATE territori SET last_return_date = '2026-01-11', is_available = true WHERE number = '30';

-- T31: Carmela Arena (11/09/25 - 30/09/25) | Gaetano Ferrara (05/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Arena Carmela', '2025-09-11', '2025-09-30', true, true, true 
FROM territori WHERE number = '31';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ferrara Gaetano', '2026-02-05', NULL, false, true, false 
FROM territori WHERE number = '31';
UPDATE territori SET last_return_date = '2025-09-30', is_available = false WHERE number = '31';

-- T32: Federico Giraudo (01/10/25 - 04/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giraudo Federico', '2025-10-01', '2026-01-04', true, true, true 
FROM territori WHERE number = '32';
UPDATE territori SET last_return_date = '2026-01-04', is_available = true WHERE number = '32';

-- T33: Alessandro Imerone (03/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Imerone Alessandro', '2025-09-03', '2025-09-30', true, true, true 
FROM territori WHERE number = '33';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '33';

-- T34: Gaetano Ferrara (01/09/25 - 07/09/25) | Dario Cona (23/12/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ferrara Gaetano', '2025-09-01', '2025-09-07', true, true, true 
FROM territori WHERE number = '34';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Cona Dario', '2025-12-23', NULL, false, true, false 
FROM territori WHERE number = '34';
UPDATE territori SET last_return_date = '2025-09-07', is_available = false WHERE number = '34';

-- T35: Antonio Chavarria (26/11/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Chavarria Antonio', '2025-11-26', NULL, false, true, false 
FROM territori WHERE number = '35';
UPDATE territori SET last_return_date = '2025-08-31', is_available = false WHERE number = '35';

-- T36: Amalia Ceretto (28/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ceretto Amalia', '2025-09-28', '2025-09-30', true, true, true 
FROM territori WHERE number = '36';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '36';

-- T37: Gianfranco Cribellati (01/09/25 - 11/09/25) | Vittorio Poeta (15/12/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Cribellati Gianfranco', '2025-09-01', '2025-09-11', true, true, true 
FROM territori WHERE number = '37';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Poeta Vittorio', '2025-12-15', NULL, false, true, false 
FROM territori WHERE number = '37';
UPDATE territori SET last_return_date = '2025-09-11', is_available = false WHERE number = '37';

-- T38: Giovanni Sabarino (OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Sabarino Giovanni', '2026-01-01', NULL, false, true, false 
FROM territori WHERE number = '38';
UPDATE territori SET last_return_date = '2025-08-31', is_available = false WHERE number = '38';
