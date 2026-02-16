-- PULIZIA PER I TERRITORI 1-17
DELETE FROM assegnazioni 
WHERE territory_id IN (SELECT id FROM territori WHERE number::int BETWEEN 1 AND 17);

-- RESETTA STATO TERRITORI 1-17
UPDATE territori SET is_available = true WHERE number::int BETWEEN 1 AND 17;

-- INSERIMENTO ASSEGNAZIONI (Formato YYYY-MM-DD)
-- Uso 'assignment_date' invece di 'assigned_date' (corretto in base al codice dell'app)

-- T1: Paola De Nanzio (05/10/25 - 29/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Paola De Nanzio', '2025-10-05', '2026-01-29', true, true, true 
FROM territori WHERE number = '1';
UPDATE territori SET last_return_date = '2026-01-29', is_available = true WHERE number = '1';

-- T2: Amalia Ceretto (01/09/25 - 13/09/25) | Mariella Specchio (31/01/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Amalia Ceretto', '2025-09-01', '2025-09-13', true, true, true 
FROM territori WHERE number = '2';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Mariella Specchio', '2026-01-31', NULL, false, true, false 
FROM territori WHERE number = '2';
UPDATE territori SET last_return_date = '2025-09-13', is_available = false WHERE number = '2';

-- T3: Marisa Arneris (29/10/25 - 21/11/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Marisa Arneris', '2025-10-29', '2025-11-21', true, true, true 
FROM territori WHERE number = '3';
UPDATE territori SET last_return_date = '2025-11-21', is_available = true WHERE number = '3';

-- T4: Laura Dierna (01/11/25 - 15/02/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Laura Dierna', '2025-11-01', '2026-02-15', true, true, true 
FROM territori WHERE number = '4';
UPDATE territori SET last_return_date = '2026-02-15', is_available = true WHERE number = '4';

-- T5: Ivana Bertoncello (01/10/25 - 23/10/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ivana Bertoncello', '2025-10-01', '2025-10-23', true, true, true 
FROM territori WHERE number = '5';
UPDATE territori SET last_return_date = '2025-10-23', is_available = true WHERE number = '5';

-- T6: Antonia Antuofermo (01/09/25 - 18/09/25) | Domenico Monte (31/01/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Antonia Antuofermo', '2025-09-01', '2025-09-18', true, true, true 
FROM territori WHERE number = '6';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Domenico Monte', '2026-01-31', NULL, false, true, false 
FROM territori WHERE number = '6';
UPDATE territori SET last_return_date = '2025-09-18', is_available = false WHERE number = '6';

-- T7: Amalia Ceretto (13/09/25 - 15/09/25) | Antonia Antuofermo (08/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Amalia Ceretto', '2025-09-13', '2025-09-15', true, true, true 
FROM territori WHERE number = '7';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Antonia Antuofermo', '2026-02-08', NULL, false, true, false 
FROM territori WHERE number = '7';
UPDATE territori SET last_return_date = '2025-09-15', is_available = false WHERE number = '7';

-- T8: Domenico Monte (20/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Domenico Monte', '2025-09-20', '2025-09-30', true, true, true 
FROM territori WHERE number = '8';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '8';

-- T9: Ivana Bertoncello (18/09/25 - 23/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Ivana Bertoncello', '2025-09-18', '2025-09-23', true, true, true 
FROM territori WHERE number = '9';
UPDATE territori SET last_return_date = '2025-09-23', is_available = true WHERE number = '9';

-- T10: Marco Conte (01/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Marco Conte', '2025-09-01', '2025-09-30', true, true, true 
FROM territori WHERE number = '10';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '10';

-- T11: Giancarlo Bertoncello (08/10/25 - 22/01/26)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giancarlo Bertoncello', '2025-10-08', '2026-01-22', true, true, true 
FROM territori WHERE number = '11';
UPDATE territori SET last_return_date = '2026-01-22', is_available = true WHERE number = '11';

-- T12: Marisa Arneris (04/09/25 - 09/09/25) | Laura Dierna (15/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Marisa Arneris', '2025-09-04', '2025-09-09', true, true, true 
FROM territori WHERE number = '12';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Laura Dierna', '2026-02-15', NULL, false, true, false 
FROM territori WHERE number = '12';
UPDATE territori SET last_return_date = '2025-09-09', is_available = false WHERE number = '12';

-- T13: Roberto Ceretto (27/10/25 - 16/11/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Roberto Ceretto', '2025-10-27', '2025-11-16', true, true, true 
FROM territori WHERE number = '13';
UPDATE territori SET last_return_date = '2025-11-16', is_available = true WHERE number = '13';

-- T14: Rachele Sabarino (10/10/25 - 02/02/26) | Rachele Sabarino (02/02/26 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Rachele Sabarino', '2025-10-10', '2026-02-02', true, true, true 
FROM territori WHERE number = '14';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Rachele Sabarino', '2026-02-02', NULL, false, true, false 
FROM territori WHERE number = '14';
UPDATE territori SET last_return_date = '2026-02-02', is_available = false WHERE number = '14';

-- T15: Amalia Ceretto (15/09/25 - 24/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Amalia Ceretto', '2025-09-15', '2025-09-24', true, true, true 
FROM territori WHERE number = '15';
UPDATE territori SET last_return_date = '2025-09-24', is_available = true WHERE number = '15';

-- T16: Alessandro Berna (10/07/25 - 27/07/25) | Gianfranco Cribellati (02/11/25 - OPEN)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Alessandro Berna', '2025-07-10', '2025-07-27', true, true, true 
FROM territori WHERE number = '16';
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Gianfranco Cribellati', '2025-11-02', NULL, false, true, false 
FROM territori WHERE number = '16';
UPDATE territori SET last_return_date = '2025-07-27', is_available = false WHERE number = '16';

-- T17: Giorgio Vitaliani (01/09/25 - 30/09/25)
INSERT INTO assegnazioni (territory_id, assignee_name, assignment_date, return_date, is_completed, s13_assign_marked, s13_return_marked)
SELECT id, 'Giorgio Vitaliani', '2025-09-01', '2025-09-30', true, true, true 
FROM territori WHERE number = '17';
UPDATE territori SET last_return_date = '2025-09-30', is_available = true WHERE number = '17';
