import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { useAuth } from './context/AuthContext';
import UpdatePassword from './components/UpdatePassword';
import {
  Map as MapIcon,
  User,
  Search,
  Plus,
  Calendar,
  X,
  ChevronRight,
  ArrowLeftRight,
  Download,
  Clock,
  History,
  CheckCircle,
  LogIn,
  LogOut,
  Loader2,
  RefreshCw,
  PieChart as PieChartIcon,
  Info,
  AlertTriangle,
  AlertOctagon,
  TrendingUp,
  ClipboardList,
  CheckSquare,
  Lock
} from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock users for UI names (in a real app these would be in a profile table)
const USERS_LIST = [
  { id: '1', name: 'Alesci Angela' },
  { id: '2', name: 'Ameris Marisa' },
  { id: '3', name: 'Antufermo Antonia' },
  { id: '4', name: 'Arena Carmela' },
  { id: '5', name: 'Arsalice Carla' },
  { id: '6', name: 'Astuto Carmen' },
  { id: '7', name: 'Astuto Sebastiano' },
  { id: '8', name: 'Battistutta Carlo' },
  { id: '9', name: 'Battistutta Gabriele' },
  { id: '10', name: 'Battistutta Sabrina' },
  { id: '11', name: 'Beltrani Lidia' },
  { id: '12', name: 'Benzoni Rosangela' },
  { id: '13', name: 'Bertoncello Giancarlo' },
  { id: '14', name: 'Bertoncello Ivana' },
  { id: '15', name: 'Bonvissuto Angelo' },
  { id: '16', name: 'Bosso Livio' },
  { id: '17', name: 'Bosso Rosalia' },
  { id: '18', name: 'Carballo Silvia' },
  { id: '19', name: 'Ceretto Amalia' },
  { id: '20', name: 'Ceretto Roberto' },
  { id: '21', name: 'Chavarria Antonio' },
  { id: '22', name: 'Chavarria Emily' },
  { id: '23', name: 'Chavarria Evelyn' },
  { id: '24', name: 'Cona Angelo' },
  { id: '25', name: 'Cona Dario' },
  { id: '26', name: 'Cona Rosa' },
  { id: '27', name: 'Conte Barbara' },
  { id: '28', name: 'Conte Marco' },
  { id: '29', name: 'Cribellati Gianfranco' },
  { id: '30', name: 'Crittino Fabio' },
  { id: '31', name: 'De Cesare Maria' },
  { id: '32', name: 'De Cesare Santino' },
  { id: '33', name: 'De Narzio Paola' },
  { id: '34', name: 'De Vita Barbara' },
  { id: '35', name: 'DeGiovanni Marco' },
  { id: '36', name: 'Dierna Laura' },
  { id: '37', name: 'Dierna Rocco' },
  { id: '38', name: 'Driusso Mauro' },
  { id: '39', name: 'Egitto Anna' },
  { id: '40', name: 'Egitto Salvatore' },
  { id: '41', name: 'Egitto Valentina' },
  { id: '42', name: 'Ferrara Angela' },
  { id: '43', name: 'Ferrara Gaetano' },
  { id: '44', name: 'Floris Alessia' },
  { id: '45', name: 'Floris Claudio' },
  { id: '46', name: 'Formigoni William' },
  { id: '47', name: 'Frustairero Antonia' },
  { id: '48', name: 'Giraudo Alessandra' },
  { id: '49', name: 'Giraudo Federico' },
  { id: '50', name: 'Giraudo Flavio' },
  { id: '51', name: 'Giraudo Matteo' },
  { id: '52', name: 'Gruggio Mariella' },
  { id: '53', name: 'Guerrera Maria' },
  { id: '54', name: 'Imerone Alessandro' },
  { id: '55', name: 'Manfredi Irene' },
  { id: '56', name: 'Martin Lidia' },
  { id: '57', name: 'Massa Michele' },
  { id: '58', name: 'Monte Angela' },
  { id: '59', name: 'Monte Domenico' },
  { id: '60', name: 'Monte Giuseppina' },
  { id: '61', name: 'Monte Maria Teresa' },
  { id: '62', name: 'Monte Tommaso' },
  { id: '63', name: 'Montesso Ivana' },
  { id: '64', name: 'Nigra Angela' },
  { id: '65', name: 'Nigra Rosalba' },
  { id: '66', name: 'Nodari Daniela' },
  { id: '67', name: 'Nodari Pier Giacomo' },
  { id: '68', name: 'Palmirotta Gessica' },
  { id: '69', name: 'Palmirotta Loretta' },
  { id: '70', name: 'Palmirotta Stefano' },
  { id: '71', name: 'Palmirotta Valentino' },
  { id: '72', name: 'Peretti Teresa' },
  { id: '73', name: 'Piazzano Antonella' },
  { id: '74', name: 'Piazzano Daniele' },
  { id: '75', name: 'Plona Adriano' },
  { id: '76', name: 'Plona Annarita' },
  { id: '77', name: 'Poeta Valeria' },
  { id: '78', name: 'Poeta Vittorio' },
  { id: '79', name: 'Renditore Fabrizio' },
  { id: '80', name: 'Renditore Gian Pietro' },
  { id: '81', name: 'Renditore Lucia' },
  { id: '82', name: 'Renditore Sabrina' },
  { id: '83', name: 'Rovea Ernestina' },
  { id: '84', name: 'Sabarino Giovanni' },
  { id: '85', name: 'Sabarino Pierina' },
  { id: '86', name: 'Sabarino Rachele' },
  { id: '87', name: 'Slano Patrizia' },
  { id: '88', name: 'Specchio Mariella' },
  { id: '89', name: 'Vizdoaga Jana' },
  { id: '90', name: 'Vitaliani Andrea' },
  { id: '91', name: 'Vitaliani Denise' },
  { id: '92', name: 'Vitaliani Giorgio' },
  { id: '93', name: 'Vitaliani Graziella' },
  { id: '94', name: 'Vitaliani Simone' },
  { id: '95', name: 'Vitaliani Sonia' },
  { id: '96', name: 'Vitaliani Tiziano' },
  { id: '97', name: 'Zire Naomi' }
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) setError('Accesso fallito. Controlla le credenziali.');
    setIsLoggingIn(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 40px rgba(59,130,246,0.15); } 50% { box-shadow: 0 0 80px rgba(59,130,246,0.3); } }
        .login-input { width: 100%; padding: 14px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #f1f5f9; font-size: 15px; outline: none; transition: all 0.3s; }
        .login-input:focus { border-color: #3b82f6; background: rgba(255,255,255,0.08); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        .login-input::placeholder { color: rgba(148,163,184,0.6); }
        .login-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .login-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(59,130,246,0.35); }
        .login-btn:active { transform: translateY(0); }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
      `}} />

      {/* Decorative floating elements */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', animation: 'float 8s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', animation: 'float 10s ease-in-out infinite 2s', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', right: '25%', width: '150px', height: '150px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', animation: 'float 6s ease-in-out infinite 1s', pointerEvents: 'none' }} />

      {/* Logo + Title */}
      <div style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', animation: 'pulse-glow 3s ease-in-out infinite' }}>
          <MapIcon size={32} color="white" />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 800, margin: '0 0 8px 0', color: '#f1f5f9', letterSpacing: '-1px' }}>Territorium</h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>Gestione territori e assegnazioni</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '380px', display: 'grid', gap: '20px', position: 'relative', zIndex: 1 }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#94a3b8' }}>Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="nome@esempio.it"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#94a3b8' }}>Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div style={{ fontSize: '13px', color: '#f87171', textAlign: 'center', padding: '8px 12px', background: 'rgba(248,113,113,0.1)', borderRadius: '8px' }}>{error}</div>}

        <button type="submit" className="login-btn clickable" disabled={isLoggingIn}>
          {isLoggingIn ? <Loader2 className="spin" size={20} /> : 'Accedi'}
        </button>
      </form>

      <p style={{ marginTop: '32px', fontSize: '12px', color: '#475569', position: 'relative', zIndex: 1 }}>© 2026 Territorium</p>
    </div>
  );
}

function App() {
  const { user, signOut } = useAuth();
  const [territori, setTerritori] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('disponibili');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterExpiry, setFilterExpiry] = useState('');
  const [historyStart, setHistoryStart] = useState('');
  const [historyEnd, setHistoryEnd] = useState('');

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [customDate, setCustomDate] = useState(new Date().toISOString().split('T')[0]);
  const [showStats, setShowStats] = useState(false);
  const [showPercorrenza, setShowPercorrenza] = useState(false);
  const [showS13Queue, setShowS13Queue] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);
  const [flashUpdate, setFlashUpdate] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    console.log('Recupero dati dal server...');
    const { data: tData } = await supabase.from('territori').select('*').order('number');
    const { data: aData } = await supabase.from('assegnazioni').select('*');
    setTerritori(tData || []);
    setAssignments(aData || []);
    setLoading(false);
    setFlashUpdate(false);
  }, [user]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchData();

    // Real-time subscription (single channel for all tables)
    console.log('Attivazione Sottoscrizione Unica...');

    const channel = supabase.channel('app_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'territori' }, (payload) => {
        console.log('Evento Territori:', payload);
        setFlashUpdate(true);
        if (payload.eventType === 'INSERT') {
          setTerritori(prev => {
            if (prev.some(t => t.id === payload.new.id)) return prev;
            return [...prev, payload.new].sort((a, b) => parseInt(a.number) - parseInt(b.number));
          });
        } else if (payload.eventType === 'UPDATE') {
          setTerritori(prev => prev.map(t => t.id === payload.new.id ? payload.new : t));
        } else if (payload.eventType === 'DELETE') {
          setTerritori(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assegnazioni' }, (payload) => {
        console.log('Evento Assegnazioni:', payload);
        setFlashUpdate(true);
        if (payload.eventType === 'INSERT') {
          setAssignments(prev => {
            if (prev.some(a => a.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
        } else if (payload.eventType === 'UPDATE') {
          setAssignments(prev => prev.map(a => a.id === payload.new.id ? payload.new : a));
        } else if (payload.eventType === 'DELETE') {
          setAssignments(prev => prev.filter(a => a.id !== payload.old.id));
        }
      })
      .subscribe((status) => {
        console.log('Stato Realtime:', status);
        if (status === 'CHANNEL_ERROR') {
          console.warn('Errore Realtime: Probabile blocco WebSocket o configurazione mancante.');
        }
      });

    return () => {
      console.log('Pulizia Realtime...');
      supabase.removeChannel(channel);
    };
  }, [user, fetchData]);

  const countries = useMemo(() => [...new Set(territori.map(t => t.country))], [territori]);
  const types = useMemo(() => [...new Set(territori.map(t => t.type))], [territori]);

  const filteredAvailable = useMemo(() => {
    return territori
      .filter(t => t.is_available)
      .filter(t => (filterCountry === '' || t.country === filterCountry))
      .filter(t => (filterType === '' || t.type === filterType))
      .filter(t => (searchQuery === '' || t.country.toLowerCase().includes(searchQuery.toLowerCase()) || t.number.includes(searchQuery)))
      .sort((a, b) => new Date(a.last_return_date) - new Date(b.last_return_date));
  }, [territori, filterCountry, filterType, searchQuery]);

  // Helper: compute expiry status for an assignment
  const getExpiryStatus = useCallback((assignmentDate) => {
    const now = new Date();
    const assigned = new Date(assignmentDate);
    const fourMonths = new Date(assigned);
    fourMonths.setMonth(fourMonths.getMonth() + 4);
    const twoWeeksBefore = new Date(fourMonths);
    twoWeeksBefore.setDate(twoWeeksBefore.getDate() - 14);
    const daysLeft = Math.ceil((fourMonths - now) / (1000 * 60 * 60 * 24));

    if (now >= fourMonths) return { status: 'expired', daysLeft };
    if (now >= twoWeeksBefore) return { status: 'expiring', daysLeft };
    return { status: 'ok', daysLeft };
  }, []);

  const filteredWorking = useMemo(() => {
    return assignments
      .filter(a => !a.is_completed)
      .map(a => ({
        ...a,
        territory: territori.find(t => t.id === a.territory_id),
      }))
      .filter(a => a.territory)
      .filter(a => (filterCountry === '' || a.territory.country === filterCountry))
      .filter(a => (filterAssignee === '' || a.assignee_name === filterAssignee))
      .filter(a => {
        if (filterExpiry === '') return true;
        const { status } = getExpiryStatus(a.assignment_date);
        if (filterExpiry === 'expiring') return status === 'expiring';
        if (filterExpiry === 'expired') return status === 'expired';
        if (filterExpiry === 'alert') return status === 'expiring' || status === 'expired';
        return true;
      })
      .filter(a => (searchQuery === '' || a.territory.country.toLowerCase().includes(searchQuery.toLowerCase()) || a.territory.number.includes(searchQuery) || a.assignee_name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [assignments, territori, filterCountry, filterAssignee, filterExpiry, searchQuery, getExpiryStatus]);

  const filteredReturned = useMemo(() => {
    return territori
      .filter(t => t.is_available && t.last_return_date)
      .filter(t => {
        if (!historyStart && !historyEnd) return true;
        const rDate = new Date(t.last_return_date);
        const start = historyStart ? new Date(historyStart) : new Date('1900-01-01');
        const end = historyEnd ? new Date(historyEnd) : new Date('2100-01-01');
        return rDate >= start && rDate <= end;
      })
      .filter(t => (searchQuery === '' || t.country.toLowerCase().includes(searchQuery.toLowerCase()) || t.number.includes(searchQuery)))
      .sort((a, b) => new Date(b.last_return_date) - new Date(a.last_return_date));
  }, [territori, historyStart, historyEnd, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredReturned.length;
    return { total };
  }, [filteredReturned]);

  const handleAssign = async () => {
    if (!selectedTerritory || !selectedAssignee) return;

    // Re-check availability from DB to prevent double assignment
    const { data: freshTerritory } = await supabase
      .from('territori')
      .select('is_available')
      .eq('id', selectedTerritory.id)
      .single();

    if (!freshTerritory || !freshTerritory.is_available) {
      alert('⚠️ Questo territorio è già stato assegnato da un altro utente.');
      fetchData(); // Refresh local data
      setShowAssignModal(false);
      setSelectedTerritory(null);
      setSelectedAssignee('');
      return;
    }

    const newAssignment = {
      territory_id: selectedTerritory.id,
      assignee_name: selectedAssignee,
      assignment_date: customDate,
      is_completed: false,
      s13_assign_marked: false,
      s13_return_marked: false
    };

    const { data, error: aError } = await supabase.from('assegnazioni').insert([newAssignment]).select();

    if (aError) {
      alert('Errore database (assegnazione): ' + aError.message);
      return;
    }

    const { error: tError } = await supabase.from('territori').update({ is_available: false }).eq('id', selectedTerritory.id);

    if (tError) {
      alert('Errore database (territorio): ' + tError.message);
      return;
    }

    // Refresh all data for consistent state
    await fetchData();

    setShowAssignModal(false);
    setSelectedTerritory(null);
    setSelectedAssignee('');
  };

  const handleReturn = async () => {
    if (!selectedTerritory) return;
    const activeAssignment = assignments.find(a => a.territory_id === selectedTerritory.id && !a.is_completed);

    if (activeAssignment) {
      const { error: aError } = await supabase.from('assegnazioni').update({
        return_date: customDate,
        is_completed: true,
        s13_return_marked: false
      }).eq('id', activeAssignment.id);

      if (aError) { alert(aError.message); return; }

      const { error: tError } = await supabase.from('territori').update({
        is_available: true,
        last_return_date: customDate
      }).eq('id', selectedTerritory.id);

      if (tError) { alert(tError.message); return; }

      // Refresh all data for consistent state
      await fetchData();
    }

    setShowReturnModal(false);
    setSelectedTerritory(null);
  };

  const handleSaveNotes = async () => {
    if (!selectedTerritory) return;
    const { error } = await supabase.from('territori').update({ notes: editNotes }).eq('id', selectedTerritory.id);
    if (!error) {
      setTerritori(prev => prev.map(t => t.id === selectedTerritory.id ? { ...t, notes: editNotes } : t));
    }
    setShowDetailModal(false);
    setSelectedTerritory(null);
  };

  const handleAddTerritory = async (formData) => {
    const newT = {
      ...formData,
      is_available: true,
      last_return_date: new Date().toISOString()
    };
    const { data, error } = await supabase.from('territori').insert([newT]).select();
    if (!error) {
      setTerritori(prev => [...prev, data[0]].sort((a, b) => parseInt(a.number) - parseInt(b.number)));
      setShowAddModal(false);
    } else {
      alert('Errore durante l\'aggiunta: ' + error.message);
    }
  };

  const handleDeleteTerritory = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo territorio?')) {
      const { error } = await supabase.from('territori').delete().eq('id', id);
      if (!error) {
        setTerritori(prev => prev.filter(t => t.id !== id));
        setAssignments(prev => prev.filter(a => a.territory_id !== id));
        setShowDetailModal(false);
        setSelectedTerritory(null);
      } else {
        alert('Errore eliminazione: ' + error.message);
      }
    }
  };

  const updateS13Status = async (assignmentId, type) => {
    const updateField = type === 'assign' ? { s13_assign_marked: true } : { s13_return_marked: true };
    const { error } = await supabase.from('assegnazioni').update(updateField).eq('id', assignmentId);

    if (error) {
      alert('Errore aggiornamento: ' + error.message);
    } else {
      setAssignments(prev => prev.map(a => a.id === assignmentId ? { ...a, ...updateField } : a));
    }
  };

  const openDetail = (t) => {
    setSelectedTerritory(t);
    setEditNotes(t.notes || '');
    setShowDetailModal(true);
  };

  const pendingS13Count = useMemo(() => {
    return assignments.filter(a => a.s13_assign_marked === false || (a.return_date && a.s13_return_marked === false)).length;
  }, [assignments]);

  if (isPasswordRecovery) return <UpdatePassword />;
  if (showUpdatePassword) return <UpdatePassword onCancel={() => setShowUpdatePassword(false)} />;
  if (!user) return <Login />;

  // Forced password reset for new accounts
  if (!user.user_metadata?.password_set) {
    return <UpdatePassword />;
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="spin" size={32} color="var(--primary)" />
    </div>
  );

  return (
    <div className="app-container">
      <div className="sticky-top-area">
        <header className="glass" style={{ padding: '16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '-0.5px', minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <MapIcon size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
            Territorium
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <button className="btn btn-secondary clickable" onClick={() => setShowS13Queue(!showS13Queue)} title="Coda S-13" style={{ width: '34px', height: '34px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', borderColor: showS13Queue ? 'var(--primary)' : 'var(--border-medium)', color: showS13Queue ? 'var(--primary)' : 'inherit' }}>
              <ClipboardList size={16} />
              {pendingS13Count > 0 && (
                <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#EF4444', color: 'white', fontSize: '10px', fontWeight: 800, minWidth: '16px', height: '16px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white', lineHeight: 1 }}>
                  {pendingS13Count}
                </div>
              )}
            </button>
            <button className="btn btn-secondary clickable" onClick={() => setShowStats(!showStats)} title="Statistiche" style={{ width: '34px', height: '34px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: showStats ? 'var(--primary)' : 'inherit', borderColor: showStats ? 'var(--primary)' : 'var(--border-medium)' }}>
              <PieChartIcon size={16} />
            </button>
            <button className="btn btn-secondary clickable" onClick={() => setShowPercorrenza(!showPercorrenza)} title="Media Percorrenza" style={{ width: '34px', height: '34px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: showPercorrenza ? '#8b5cf6' : 'inherit', borderColor: showPercorrenza ? '#8b5cf6' : 'var(--border-medium)' }}>
              <TrendingUp size={16} />
            </button>
            <button className={`btn btn-secondary clickable ${flashUpdate ? 'pulse-update' : ''}`} onClick={fetchData} title="Ricarica" style={{ width: '34px', height: '34px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={16} className={loading ? 'spin' : ''} />
            </button>

            <button className="btn btn-secondary clickable" onClick={signOut} title="Esci" style={{ width: '34px', height: '34px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="tabs-container">
          {['disponibili', 'lavorazione', 'storico'].map(tab => {
            const labels = { disponibili: 'Disponibili', lavorazione: 'In Lavorazione', storico: 'Rientri' };
            return (
              <div key={tab} className={`tab clickable ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {labels[tab]}
              </div>
            );
          })}
        </div>

        <div className="search-filters">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input className="search-input" placeholder="Cerca..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {activeTab !== 'storico' && (
              <select className="filter-select" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)} style={{ flex: '1 1 auto', minWidth: '90px' }}>
                <option value="">Paese</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
            {activeTab === 'disponibili' ? (
              <select className="filter-select" value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ flex: '1 1 auto', minWidth: '80px' }}>
                <option value="">Tipo</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            ) : activeTab === 'lavorazione' ? (
              <>
                <select className="filter-select" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} style={{ flex: '1 1 auto', minWidth: '120px' }}>
                  <option value="">Incaricato</option>
                  {USERS_LIST.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
                </select>
                <select className="filter-select" value={filterExpiry} onChange={(e) => setFilterExpiry(e.target.value)} style={{ flex: '1 1 auto', minWidth: '110px' }}>
                  <option value="">Scadenza</option>
                  <option value="alert">⚠️ In scadenza + Scaduti</option>
                  <option value="expiring">🟡 In scadenza</option>
                  <option value="expired">🔴 Scaduti</option>
                </select>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-medium)', flex: '1 1 auto' }}>
                <input type="date" value={historyStart} onChange={(e) => setHistoryStart(e.target.value)} style={{ background: 'transparent', border: 'none', fontSize: '13px', outline: 'none', flex: 1, minWidth: 0 }} />
                <ChevronRight size={12} color="var(--text-muted)" />
                <input type="date" value={historyEnd} onChange={(e) => setHistoryEnd(e.target.value)} style={{ background: 'transparent', border: 'none', fontSize: '13px', outline: 'none', flex: 1, minWidth: 0 }} />
              </div>
            )}
            {(searchQuery || filterCountry || filterType || filterAssignee || filterExpiry || historyStart || historyEnd) && (
              <button
                className="btn btn-secondary clickable"
                onClick={() => { setSearchQuery(''); setFilterCountry(''); setFilterType(''); setFilterAssignee(''); setFilterExpiry(''); setHistoryStart(''); setHistoryEnd(''); }}
                title="Reset filtri"
                style={{ width: '36px', height: '36px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#DC2626', borderColor: '#FEE2E2' }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {showStats && <StatsView territori={territori} assignments={assignments} onClose={() => setShowStats(false)} />}
      {showPercorrenza && <PercorrenzaView territori={territori} assignments={assignments} onClose={() => setShowPercorrenza(false)} />}

      <div className="content-container" style={{ display: 'grid', gap: '16px' }}>
        {activeTab === 'disponibili' ? (
          filteredAvailable.map(t => (
            <div key={t.id} className="card clickable" onClick={() => openDetail(t)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{t.country} <span style={{ color: 'var(--primary)' }}>#{t.number}</span></h3>
                <span className={`badge ${t.type === 'Commerciale' ? 'badge-commercial' : 'badge-ordinary'}`}>{t.type}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> Riconsegnato il {new Date(t.last_return_date).toLocaleDateString('it-IT')}
                </div>
                <button className="btn btn-primary clickable" onClick={(e) => { e.stopPropagation(); setSelectedTerritory(t); setShowAssignModal(true); }}>Assegna</button>
              </div>
              {t.notes && <div style={{ marginTop: '12px', padding: '10px', background: '#FEF2F2', borderRadius: '6px', fontSize: '12px', color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '8px' }}><X size={14} /> Da non visitare</div>}
            </div>
          ))
        ) : activeTab === 'lavorazione' ? (
          filteredWorking.map(a => {
            const expiry = getExpiryStatus(a.assignment_date);
            return (
              <div key={a.id} className="card clickable" onClick={() => openDetail(a.territory)} style={{ boxShadow: expiry.status === 'expired' ? 'inset 3px 0 0 #DC2626, var(--shadow-sm)' : expiry.status === 'expiring' ? 'inset 3px 0 0 #F59E0B, var(--shadow-sm)' : undefined }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{a.territory.country} <span style={{ color: 'var(--primary)' }}>#{a.territory.number}</span></h3>
                  {expiry.status === 'expired' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#DC2626', background: '#FEF2F2', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      <AlertOctagon size={13} /> Scaduto da {Math.abs(expiry.daysLeft)}g
                    </div>
                  )}
                  {expiry.status === 'expiring' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 600, color: '#92400E', background: '#FEF3C7', padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      <AlertTriangle size={13} /> Scade tra {expiry.daysLeft}g
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}><User size={18} /></div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{a.assignee_name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dal {new Date(a.assignment_date).toLocaleDateString('it-IT')}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary clickable" style={{ color: '#DC2626', borderColor: '#FEE2E2' }} onClick={(e) => { e.stopPropagation(); setSelectedTerritory(a.territory); setShowReturnModal(true); }}>Riconsegna</button>
                </div>
              </div>
            );
          })
        ) : (
          <>
            {filteredReturned.map(t => {
              const lastAssignment = assignments
                .filter(a => a.territory_id === t.id && a.is_completed)
                .sort((a, b) => new Date(b.return_date) - new Date(a.return_date))[0];
              return (
                <div key={t.id} className="card clickable" onClick={() => openDetail(t)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px' }}>{t.country} <span style={{ color: 'var(--primary)' }}>#{t.number}</span></h3>
                    <span className={`badge ${t.type === 'Commerciale' ? 'badge-commercial' : 'badge-ordinary'}`}>{t.type}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--primary)', fontWeight: 600, marginBottom: lastAssignment ? '8px' : '0' }}>
                    <CheckCircle size={14} />
                    Rientrato il {new Date(t.last_return_date).toLocaleDateString('it-IT')}
                  </div>
                  {lastAssignment && (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={12} /> {lastAssignment.assignee_name}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Modals */}
      {
        showDetailModal && (
          <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Dettagli</h2>
                <X size={24} className="clickable" onClick={() => setShowDetailModal(false)} />
              </div>
              <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>PAESE</div>
                  <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedTerritory?.country}</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>IDENTIFICATIVO</div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary)' }}>#{selectedTerritory?.number}</div>
                </div>
                {(() => {
                  const activeAssignment = assignments.find(a => a.territory_id === selectedTerritory?.id && !a.is_completed);
                  return activeAssignment ? (
                    <div style={{ padding: '16px', background: 'var(--primary-soft)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                        <User size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>ASSEGNATO A</div>
                        <div style={{ fontSize: '16px', fontWeight: 600 }}>{activeAssignment.assignee_name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Dal {new Date(activeAssignment.assignment_date).toLocaleDateString('it-IT')}</div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ padding: '16px', background: 'var(--bg-app)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>STATO</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: '#10B981' }}>Disponibile</div>
                    </div>
                  );
                })()}
                <a href={selectedTerritory?.pdf_url} target="_blank" rel="noreferrer" className="btn btn-secondary clickable" style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-primary)' }}>
                  <Download size={16} /> Apri Mappa PDF
                </a>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Note</label>
                <textarea className="search-input" style={{ width: '100%', height: '100px' }} value={editNotes} onChange={e => setEditNotes(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                {selectedTerritory?.is_available ? (
                  <button className="btn btn-primary clickable" style={{ flex: 2 }} onClick={() => { setShowDetailModal(false); setShowAssignModal(true); }}>Assegna</button>
                ) : (
                  <button className="btn btn-primary clickable" style={{ flex: 2 }} onClick={handleSaveNotes}>Salva Note</button>
                )}
                <button className="btn btn-secondary clickable" style={{ flex: 1 }} onClick={() => setShowDetailModal(false)}>Chiudi</button>
              </div>
            </div>
          </div>
        )
      }

      {
        showAssignModal && (
          <div className="modal-overlay" onClick={() => setShowAssignModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2 style={{ marginBottom: '24px' }}>Assegna Mappa</h2>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                <select className="filter-select" style={{ width: '100%' }} value={selectedTerritory?.id || ''} onChange={e => setSelectedTerritory(territori.find(t => t.id === e.target.value))}>
                  <option value="">Seleziona Mappa</option>
                  {territori.filter(t => t.is_available).map(t => <option key={t.id} value={t.id}>{t.country} #{t.number}</option>)}
                </select>
                <select className="filter-select" style={{ width: '100%' }} value={selectedAssignee} onChange={e => setSelectedAssignee(e.target.value)}>
                  <option value="">Seleziona Incaricato</option>
                  {USERS_LIST.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
                </select>
                <input type="date" className="filter-select" style={{ width: '100%' }} value={customDate} onChange={e => setCustomDate(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary clickable" style={{ flex: 1 }} onClick={handleAssign}>Conferma</button>
                <button className="btn btn-secondary clickable" style={{ flex: 1 }} onClick={() => setShowAssignModal(false)}>Annulla</button>
              </div>
            </div>
          </div>
        )
      }

      {
        showReturnModal && (
          <div className="modal-overlay" onClick={() => setShowReturnModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2 style={{ marginBottom: '24px' }}>Riconsegna Mappa</h2>
              <p style={{ marginBottom: '24px', color: 'var(--text-muted)' }}>Stai riconsegnando il territorio <strong>{selectedTerritory?.country} #{selectedTerritory?.number}</strong>.</p>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Data di Riconsegna</label>
                <input type="date" className="filter-select" style={{ width: '100%' }} value={customDate} onChange={e => setCustomDate(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary clickable" style={{ flex: 1 }} onClick={handleReturn}>Conferma</button>
                <button className="btn btn-secondary clickable" style={{ flex: 1 }} onClick={() => setShowReturnModal(false)}>Annulla</button>
              </div>
            </div>
          </div>
        )
      }

      {
        showAddModal && (
          <AddTerritoryModal
            onClose={() => setShowAddModal(false)}
            onSave={handleAddTerritory}
          />
        )
      }



      {showPercorrenza && (
        <PercorrenzaView
          territori={territori}
          assignments={assignments}
          onClose={() => setShowPercorrenza(false)}
        />
      )}

      {showS13Queue && (
        <S13QueueModal
          assignments={assignments}
          territori={territori}
          onClose={() => setShowS13Queue(false)}
          onUpdateStatus={updateS13Status}
        />
      )}
    </div >
  );
}

function StatsView({ territori, assignments, onClose }) {
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showLegend, setShowLegend] = useState(false);
  const [showDateFilter, setShowDateFilter] = useState(false);



  const statsCore = useMemo(() => {
    let filteredTerritories = territori;

    // Unified logic: custom range or default 4 months
    const isCustomRange = startDate && endDate;
    const rangeStart = isCustomRange ? new Date(startDate) : (() => { const d = new Date(); d.setMonth(d.getMonth() - 4); return d; })();
    const rangeEnd = isCustomRange ? new Date(endDate) : new Date();

    const allWorking = filteredTerritories.filter(t => !t.is_available);
    const working = isCustomRange
      ? allWorking.filter(t => {
        const assignment = assignments.find(a => a.territory_id === t.id && !a.is_completed);
        return assignment && new Date(assignment.assignment_date) >= rangeStart;
      })
      : allWorking;
    const finished = filteredTerritories.filter(t =>
      t.is_available &&
      t.last_return_date &&
      new Date(t.last_return_date) >= rangeStart &&
      new Date(t.last_return_date) <= rangeEnd
    );
    // Da assegnare = all territories NOT in working and NOT in finished
    const workingIds = new Set(working.map(t => t.id));
    const finishedIds = new Set(finished.map(t => t.id));
    const todo = filteredTerritories.filter(t => !workingIds.has(t.id) && !finishedIds.has(t.id));

    return {
      working,
      finished,
      todo,
      chartData: [
        { name: 'Assegnati', value: working.length, color: 'var(--primary)', key: 'working', icon: <User size={16} /> },
        { name: 'Rientrati', value: finished.length, color: '#10B981', key: 'finished', icon: <CheckCircle size={16} /> },
        { name: 'Da assegnare', value: todo.length, color: '#F59E0B', key: 'todo', icon: <MapIcon size={16} /> }
      ]
    };
  }, [territori, startDate, endDate, assignments]);


  const displayedTerritories = useMemo(() => {
    if (!selectedStatus) return [];
    const list = [...statsCore[selectedStatus.key]];
    if (selectedStatus.key === 'finished') {
      // Ultimo rientrato per primo
      list.sort((a, b) => new Date(b.last_return_date || 0) - new Date(a.last_return_date || 0));
    } else if (selectedStatus.key === 'todo') {
      // Chi non esce da più tempo per primo (null = mai uscito = priorità massima)
      list.sort((a, b) => {
        const dateA = a.last_return_date ? new Date(a.last_return_date).getTime() : 0;
        const dateB = b.last_return_date ? new Date(b.last_return_date).getTime() : 0;
        return dateA - dateB;
      });
    } else if (selectedStatus.key === 'working') {
      // Uscito per ultimo per primo (assignment_date più recente)
      const getAssignDate = (t) => {
        const a = assignments.find(a => a.territory_id === t.id && !a.is_completed);
        return a ? new Date(a.assignment_date).getTime() : 0;
      };
      list.sort((a, b) => getAssignDate(b) - getAssignDate(a));
    }
    return list;
  }, [selectedStatus, statsCore, assignments]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {selectedStatus ? (
              <button
                className="btn btn-secondary clickable"
                onClick={() => setSelectedStatus(null)}
                style={{ padding: '8px', width: '36px', height: '36px', border: 'none', background: 'var(--primary-soft)', color: 'var(--primary)' }}
              >
                <ArrowLeftRight size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
            ) : (
              <div style={{ width: '40px', height: '40px', background: 'var(--primary-soft)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <PieChartIcon size={20} />
              </div>
            )}
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
                {selectedStatus ? selectedStatus.name : 'Stato Copertura'}
              </h2>
              {selectedStatus && <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{selectedStatus.value} territori trovati</div>}
            </div>
          </div>
          <button className="btn btn-secondary clickable" onClick={onClose} style={{ padding: '8px', width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {!selectedStatus && (
          <>
            {/* Desktop: always visible date picker */}
            <div className="date-filter-desktop" style={{ marginBottom: '24px', padding: '16px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <Calendar size={14} /> Periodo di riferimento <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(Default: ultimi 4 mesi)</span>
              </div>
              <div className="campaign-date-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Dal</label>
                  <input type="date" className="filter-select" style={{ width: '100%', padding: '8px' }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Al</label>
                  <input type="date" className="filter-select" style={{ width: '100%', padding: '8px' }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
              {(startDate || endDate) && (
                <button className="btn btn-secondary clickable" style={{ fontSize: '12px', padding: '4px 8px', width: 'fit-content' }} onClick={() => { setStartDate(''); setEndDate(''); }}>Ripristina ultimi 4 mesi</button>
              )}
            </div>

            {/* Mobile: collapsible date picker */}
            <div className="date-filter-mobile" style={{ marginBottom: '16px', flexShrink: 0, position: 'relative', zIndex: 5 }}>
              <button
                className="btn btn-secondary clickable"
                onClick={() => setShowDateFilter(!showDateFilter)}
                style={{ padding: '8px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: (startDate && endDate) ? 'var(--primary)' : 'var(--text-secondary)', width: '100%', justifyContent: 'center' }}
              >
                <Calendar size={14} />
                {startDate && endDate
                  ? `${new Date(startDate).toLocaleDateString('it-IT')} — ${new Date(endDate).toLocaleDateString('it-IT')}`
                  : 'Ultimi 4 mesi (cambia periodo)'
                }
              </button>
              {showDateFilter && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', padding: '12px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 10 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Dal</label>
                      <input type="date" className="filter-select" style={{ width: '100%', padding: '8px' }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Al</label>
                      <input type="date" className="filter-select" style={{ width: '100%', padding: '8px' }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {(startDate || endDate) && (
                      <button className="btn btn-secondary clickable" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={() => { setStartDate(''); setEndDate(''); setShowDateFilter(false); }}>Reset</button>
                    )}
                    <button className="btn btn-primary clickable" style={{ fontSize: '11px', padding: '4px 10px' }} onClick={() => setShowDateFilter(false)}>Chiudi</button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!selectedStatus ? (
          <div className="stats-grid" style={{ animation: 'fadeIn 0.3s ease-out', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className="stats-chart-container" style={{ width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={statsCore.chartData}
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                    onClick={(entry) => setSelectedStatus(entry)}
                    className="clickable"
                  >
                    {statsCore.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>

            {/* Desktop: inline legend, Mobile: info icon toggle */}
            <div className="stats-info-box stats-legend-desktop" style={{ marginTop: '16px' }}>
              <Info size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
              <div style={{ fontSize: '11px' }}>
                <strong>{startDate && endDate ? `Periodo: ${new Date(startDate).toLocaleDateString('it-IT')} — ${new Date(endDate).toLocaleDateString('it-IT')}` : 'Ciclo Standard (ultimi 4 mesi)'}</strong>
                <div style={{ opacity: 0.8, marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <span><strong style={{ color: 'var(--primary)' }}>In Lavorazione</strong> — territori attualmente assegnati e non ancora riconsegnati.</span>
                  <span><strong style={{ color: '#10B981' }}>Rientrati</strong> — territori riconsegnati nel periodo selezionato.</span>
                  <span><strong style={{ color: '#F59E0B' }}>Da assegnare</strong> — tutti i territori non assegnati nel periodo selezionato.</span>
                </div>
              </div>
            </div>

            {/* Mobile: inline expandable legend */}
            <div className="stats-legend-mobile" style={{ marginTop: '12px' }}>
              <button
                className="btn btn-secondary clickable"
                onClick={() => setShowLegend(!showLegend)}
                style={{ padding: '8px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: showLegend ? 'var(--primary)' : 'var(--text-secondary)' }}
              >
                <Info size={14} /> Legenda
              </button>
              {showLegend && (
                <div style={{
                  marginTop: '8px',
                  padding: '14px 16px',
                  background: 'var(--primary-soft)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(37, 99, 235, 0.1)',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  color: 'var(--primary)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <strong style={{ fontSize: '12px' }}>{startDate && endDate ? `${new Date(startDate).toLocaleDateString('it-IT')} — ${new Date(endDate).toLocaleDateString('it-IT')}` : 'Ultimi 4 mesi'}</strong>
                    <X size={14} className="clickable" onClick={() => setShowLegend(false)} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <span><strong>In Lavorazione</strong> — assegnati e non riconsegnati.</span>
                  <span><strong style={{ color: '#10B981' }}>Rientrati</strong> — riconsegnati nel periodo.</span>
                  <span><strong style={{ color: '#F59E0B' }}>Da assegnare</strong> — non assegnati nel periodo.</span>
                </div>
              )}
            </div>

            <div className="stats-buttons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '16px', width: '100%' }}>
              {statsCore.chartData.map((item) => (
                <div
                  key={item.name}
                  className="card clickable"
                  onClick={() => setSelectedStatus(item)}
                  style={{
                    padding: '12px 4px',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: 'var(--bg-app)',
                    border: `1px solid ${item.color}20`,
                    borderTop: `4px solid ${item.color}`,
                    gap: '4px'
                  }}
                >
                  <div style={{ color: item.color }}>{item.icon}</div>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ display: 'grid', gap: '8px' }}>
              {displayedTerritories.map(t => {
                const relatedAssignment = selectedStatus.key === 'working'
                  ? assignments.find(a => a.territory_id === t.id && !a.is_completed)
                  : selectedStatus.key === 'finished'
                    ? [...assignments].filter(a => a.territory_id === t.id && a.is_completed).sort((a, b) => new Date(b.return_date) - new Date(a.return_date))[0]
                    : null;
                return (
                  <div key={t.id} className="card" style={{ padding: '12px 16px', gap: '8px', borderLeft: `4px solid ${selectedStatus.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '15px' }}>{t.country} <span style={{ color: 'var(--primary)' }}>#{t.number}</span></div>
                      <span className="badge" style={{ background: 'var(--bg-app)', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)' }}>
                        {t.type}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={10} />
                      {t.last_return_date ? `Ultimo rientro: ${new Date(t.last_return_date).toLocaleDateString('it-IT')}` : 'Mai uscito'}
                    </div>
                    {relatedAssignment && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', padding: '8px 10px', background: 'var(--primary-soft)', borderRadius: '6px' }}>
                        <User size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                        <div style={{ fontSize: '12px' }}>
                          <span style={{ fontWeight: 600 }}>{relatedAssignment.assignee_name}</span>
                          <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>
                            {selectedStatus.key === 'working'
                              ? `dal ${new Date(relatedAssignment.assignment_date).toLocaleDateString('it-IT')}`
                              : `rientrato il ${new Date(relatedAssignment.return_date).toLocaleDateString('it-IT')}`
                            }
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {displayedTerritories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Nessun territorio in questa categoria per il periodo selezionato.
                </div>
              )}
            </div>
          </div>
        )}
      </div>











    </div >
  );
}

function PercorrenzaView({ territori, assignments, onClose }) {
  const [coverageMode, setCoverageMode] = useState('6m');
  const [coverageStart, setCoverageStart] = useState('');
  const [coverageEnd, setCoverageEnd] = useState('');
  const [showCalcInfo, setShowCalcInfo] = useState(false);

  const stats = useMemo(() => {
    const now = new Date();
    let pStart, pEnd;

    if (coverageMode === 'custom' && coverageStart && coverageEnd) {
      pStart = new Date(coverageStart);
      pEnd = new Date(coverageEnd);
    } else {
      pEnd = new Date(now);
      pStart = new Date(now);
      pStart.setMonth(pStart.getMonth() - 6);
    }

    const rientri = assignments.filter(a =>
      a.is_completed &&
      a.return_date &&
      new Date(a.return_date) >= pStart &&
      new Date(a.return_date) <= pEnd
    ).length;

    const totalTerritori = territori.length;
    const diffMs = pEnd - pStart;
    const mesiPeriodo = diffMs / (1000 * 60 * 60 * 24 * 30.44);
    const denominatore = mesiPeriodo * totalTerritori;
    const percorrenzaMesi = rientri > 0 ? denominatore / rientri : null;
    const percorrenzaGiorni = percorrenzaMesi !== null ? percorrenzaMesi * 30 : null;
    const percentuale = denominatore > 0 ? (rientri / denominatore) * 100 : 0;

    return {
      totalTerritori,
      rientri,
      mesiPeriodo: Math.round(mesiPeriodo * 10) / 10,
      percorrenzaMesi: percorrenzaMesi !== null ? Math.round(percorrenzaMesi * 10) / 10 : null,
      percorrenzaGiorni: percorrenzaGiorni !== null ? Math.round(percorrenzaGiorni * 100) / 100 : null,
      percentuale: Math.round(percentuale * 100) / 100,
      periodStart: pStart,
      periodEnd: pEnd
    };
  }, [territori, assignments, coverageMode, coverageStart, coverageEnd]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
        {/* Header — same pattern as StatsView */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary-soft)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>Media Percorrenza</h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Territori della congregazione</div>
            </div>
          </div>
          <button className="btn btn-secondary clickable" onClick={onClose} style={{ padding: '8px', width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Period toggle */}
        <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Calendar size={14} /> Periodo di riferimento
          </div>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', borderRadius: '8px', padding: '3px', border: '1px solid var(--border-light)' }}>
            <button
              className="clickable"
              onClick={() => setCoverageMode('6m')}
              style={{ flex: 1, padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: coverageMode === '6m' ? 'var(--primary)' : 'transparent', color: coverageMode === '6m' ? 'white' : 'var(--text-muted)' }}
            >
              Ultimi 6 mesi
            </button>
            <button
              className="clickable"
              onClick={() => setCoverageMode('custom')}
              style={{ flex: 1, padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: coverageMode === 'custom' ? 'var(--primary)' : 'transparent', color: coverageMode === 'custom' ? 'white' : 'var(--text-muted)' }}
            >
              Periodo custom
            </button>
          </div>

          {coverageMode === 'custom' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Dal</label>
                <input type="date" className="filter-select" style={{ width: '100%', padding: '8px' }} value={coverageStart} onChange={(e) => setCoverageStart(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Al</label>
                <input type="date" className="filter-select" style={{ width: '100%', padding: '8px' }} value={coverageEnd} onChange={(e) => setCoverageEnd(e.target.value)} />
              </div>
            </div>
          )}

          {coverageMode === '6m' && (
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} />
              {stats.periodStart.toLocaleDateString('it-IT')} — {stats.periodEnd.toLocaleDateString('it-IT')}
            </div>
          )}
        </div>

        {/* Content (no scroll) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Big result */}
          <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
            {stats.percorrenzaMesi !== null ? (
              <>
                <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-2px' }}>
                  {stats.percorrenzaMesi.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>mesi</div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', opacity: 0.7 }}>
                  ≈ {stats.percorrenzaGiorni.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} giorni
                </div>
              </>
            ) : (
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', padding: '20px 0' }}>Nessun rientro nel periodo selezionato</div>
            )}
          </div>

          {/* Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div className="card" style={{ padding: '12px 4px', alignItems: 'center', textAlign: 'center', background: 'var(--bg-app)', border: '1px solid var(--primary)20', borderTop: '4px solid var(--primary)', gap: '4px' }}>
              <div style={{ color: 'var(--primary)' }}><MapIcon size={16} /></div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Territori</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.totalTerritori}</div>
            </div>
            <div className="card" style={{ padding: '12px 4px', alignItems: 'center', textAlign: 'center', background: 'var(--bg-app)', border: '1px solid #10B98120', borderTop: '4px solid #10B981', gap: '4px' }}>
              <div style={{ color: '#10B981' }}><CheckCircle size={16} /></div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Rientri</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.rientri}</div>
            </div>
            <div className="card" style={{ padding: '12px 4px', alignItems: 'center', textAlign: 'center', background: 'var(--bg-app)', border: '1px solid #F59E0B20', borderTop: '4px solid #F59E0B', gap: '4px' }}>
              <div style={{ color: '#F59E0B' }}><TrendingUp size={16} /></div>
              <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Copertura</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.percentuale.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</div>
            </div>
          </div>

          {/* Info button */}
          <div style={{ textAlign: 'center', paddingTop: '4px' }}>
            <button
              className="btn btn-secondary clickable"
              onClick={() => setShowCalcInfo(!showCalcInfo)}
              style={{ fontSize: '12px', padding: '6px 14px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', borderColor: showCalcInfo ? 'var(--primary)' : 'var(--border-medium)' }}
            >
              <Info size={14} /> Come si calcola?
            </button>
          </div>
        </div>

        {/* Calc overlay — absolute, covers the modal content */}
        {showCalcInfo && (
          <div
            onClick={() => setShowCalcInfo(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 10, borderRadius: 'inherit', cursor: 'pointer' }}
          >
            <div onClick={(e) => e.stopPropagation()} style={{ padding: '24px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #dbe4ff', fontSize: '13px', lineHeight: 1.8, color: '#334155', maxWidth: '360px', width: '100%' }}>
              <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '12px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Info size={18} color="var(--primary)" /> Formula di calcolo
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px', background: '#f8fafc', borderRadius: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
                <span>n. mesi × n. territori = {stats.mesiPeriodo} × {stats.totalTerritori} = {Math.round(stats.mesiPeriodo * stats.totalTerritori)}</span>
                <span>Risultato ÷ n. rientri = {stats.rientri > 0 ? `${Math.round(stats.mesiPeriodo * stats.totalTerritori)} ÷ ${stats.rientri} = ${stats.percorrenzaMesi}` : '—'}</span>
              </div>
              <div style={{ marginTop: '12px', color: 'var(--primary)', fontWeight: 600, fontSize: '13px' }}>
                Il territorio è stato percorso ogni {stats.percorrenzaMesi !== null ? `${stats.percorrenzaMesi.toLocaleString('it-IT')} mesi` : '—'}.
              </div>
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <button className="btn btn-secondary clickable" onClick={() => setShowCalcInfo(false)} style={{ fontSize: '12px', padding: '6px 20px', borderRadius: '20px' }}>
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function S13QueueModal({ assignments, territori, onClose, onUpdateStatus }) {
  // Filter items that need S-13 update
  const toAssign = assignments.filter(a => a.s13_assign_marked === false);
  const toReturn = assignments.filter(a => a.return_date && a.s13_return_marked === false);

  const getTerritoryName = (id) => {
    const t = territori.find(t => t.id === id);
    return t ? `${t.country} #${t.number}` : 'Territorio sconosciuto';
  };

  const hasItems = toAssign.length > 0 || toReturn.length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ClipboardList size={24} color="var(--primary)" />
            Coda S-13
          </h2>
          <button className="btn btn-secondary clickable" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {!hasItems ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <CheckSquare size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
            <p>Tutto aggiornato! Nessuna trascrizione in sospeso.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxHeight: '60vh', overflowY: 'auto' }}>

            {/* Uscite da segnare */}
            {toAssign.length > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={16} /> DA SEGNARE USCITE ({toAssign.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {toAssign.map(a => (
                    <div key={a.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{getTerritoryName(a.territory_id)}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          Assegnato a <strong>{a.assignee_name}</strong> il {new Date(a.assignment_date).toLocaleDateString('it-IT')}
                        </div>
                      </div>
                      <button
                        className="btn btn-primary clickable"
                        onClick={() => onUpdateStatus(a.id, 'assign')}
                        style={{ padding: '6px 12px', fontSize: '12px', height: 'auto' }}
                      >
                        Fatto
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rientri da segnare */}
            {toReturn.length > 0 && (
              <div>
                <h3 style={{ fontSize: '14px', color: '#10B981', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle size={16} /> DA SEGNARE RIENTRI ({toReturn.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {toReturn.map(a => (
                    <div key={a.id} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderLeft: '4px solid #10B981' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{getTerritoryName(a.territory_id)}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          Rientrato il {new Date(a.return_date).toLocaleDateString('it-IT')}
                        </div>
                      </div>
                      <button
                        className="btn clickable"
                        onClick={() => onUpdateStatus(a.id, 'return')}
                        style={{ padding: '6px 12px', fontSize: '12px', height: 'auto', background: '#10B981', color: 'white', border: 'none' }}
                      >
                        Fatto
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AddTerritoryModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    country: '',
    number: '',
    type: 'Ordinario',
    notes: '',
    pdf_url: ''
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>Nuovo Territorio</h2>
          <X size={24} className="clickable" onClick={onClose} />
        </div>
        <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Paese</label>
            <input className="search-input" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} placeholder="Es. Italia" />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Identificativo (Numero)</label>
            <input className="search-input" value={formData.number} onChange={e => setFormData({ ...formData, number: e.target.value })} placeholder="Es. 101" />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Tipo</label>
            <select className="filter-select" style={{ width: '100%' }} value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
              <option value="Ordinario">Ordinario</option>
              <option value="Commerciale">Commerciale</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '6px' }}>URL Mappa PDF</label>
            <input className="search-input" value={formData.pdf_url} onChange={e => setFormData({ ...formData, pdf_url: e.target.value })} placeholder="https://..." />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary clickable" style={{ flex: 1 }} onClick={() => onSave(formData)}>Salva</button>
          <button className="btn btn-secondary clickable" style={{ flex: 1 }} onClick={onClose}>Annulla</button>
        </div>
      </div>
    </div>
  );
}

export default App;
