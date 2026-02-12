export const TERRITORI = [
  { id: 't1', country: 'Italia', number: '101', pdf_url: 'https://sepkcehrvokyfqbseyqy.supabase.co/storage/v1/object/public/mappe/santhia-01.pdf', type: 'Ordinario', lastReturnDate: '2026-01-15', isAvailable: true, notes: '' },
  { id: 't2', country: 'Italia', number: '102', pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'Commerciale', lastReturnDate: '2026-02-01', isAvailable: false, notes: 'Non suonare al citofono Rossi' },
  { id: 't3', country: 'Spagna', number: '201', pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'Ordinario', lastReturnDate: '2025-12-20', isAvailable: true, notes: '' },
  { id: 't4', country: 'Germania', number: '301', pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'Ordinario', lastReturnDate: '2026-01-10', isAvailable: true, notes: '' },
  { id: 't5', country: 'Italia', number: '103', pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'Ordinario', lastReturnDate: '2026-01-20', isAvailable: true, notes: '' },
];

export const USERS = [
  { id: 'u1', name: 'Mario Rossi' },
  { id: 'u2', name: 'Luigi Bianchi' },
  { id: 'u3', name: 'Anna Verdi' },
];

export const ASSIGNMENTS = [
  {
    id: 'a1',
    territoryId: 't2',
    assigneeId: 'u1',
    assignmentDate: '2026-02-05',
    returnDate: null
  },
  {
    id: 'h1',
    territoryId: 't1',
    assigneeId: 'u2',
    assignmentDate: '2026-01-05',
    returnDate: '2026-01-15'
  },
  {
    id: 'h2',
    territoryId: 't4',
    assigneeId: 'u3',
    assignmentDate: '2025-12-28',
    returnDate: '2026-01-10'
  },
  {
    id: 'h3',
    territoryId: 't5',
    assigneeId: 'u1',
    assignmentDate: '2026-01-10',
    returnDate: '2026-01-20'
  }
];
