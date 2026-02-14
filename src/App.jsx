import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { supabase } from './lib/supabase';
import { useAuth } from './context/AuthContext';
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
  Info
} from 'lucide-react';
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Mock users for UI names (in a real app these would be in a profile table)
const USERS_LIST = [
  { id: '1', name: 'Marco' },
  { id: '2', name: 'Giulia' },
  { id: '3', name: 'Luca' }
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

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    console.log('Recupero dati dal server...');
    const { data: tData } = await supabase.from('territori').select('*').order('number');
    const { data: aData } = await supabase.from('assegnazioni').select('*');
    setTerritori(tData || []);
    setAssignments(aData || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    fetchData();

    // Real-time subscription (single channel for all tables)
    console.log('Attivazione Sottoscrizione Unica...');

    const channel = supabase.channel('app_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'territori' }, (payload) => {
        console.log('Evento Territori:', payload);
        if (payload.eventType === 'INSERT') {
          setTerritori(prev => [...prev, payload.new].sort((a, b) => parseInt(a.number) - parseInt(b.number)));
        } else if (payload.eventType === 'UPDATE') {
          setTerritori(prev => prev.map(t => t.id === payload.new.id ? payload.new : t));
        } else if (payload.eventType === 'DELETE') {
          setTerritori(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assegnazioni' }, (payload) => {
        console.log('Evento Assegnazioni:', payload);
        if (payload.eventType === 'INSERT') {
          setAssignments(prev => [...prev, payload.new]);
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
      .filter(a => (searchQuery === '' || a.territory.country.toLowerCase().includes(searchQuery.toLowerCase()) || a.territory.number.includes(searchQuery) || a.assignee_name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [assignments, territori, filterCountry, filterAssignee, searchQuery]);

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
      is_completed: false
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

    // Manual update for instant UI feedback
    const savedAssignment = data[0];
    setAssignments(prev => [...prev, savedAssignment]);
    setTerritori(prev => prev.map(t => t.id === selectedTerritory.id ? { ...t, is_available: false } : t));

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
        is_completed: true
      }).eq('id', activeAssignment.id);

      if (aError) { alert(aError.message); return; }

      const { error: tError } = await supabase.from('territori').update({
        is_available: true,
        last_return_date: customDate
      }).eq('id', selectedTerritory.id);

      if (tError) { alert(tError.message); return; }

      // Manual update
      setAssignments(prev => prev.map(a => a.id === activeAssignment.id ? { ...a, return_date: customDate, is_completed: true } : a));
      setTerritori(prev => prev.map(t => t.id === selectedTerritory.id ? { ...t, is_available: true, last_return_date: customDate } : t));
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

  const openDetail = (t) => {
    setSelectedTerritory(t);
    setEditNotes(t.notes || '');
    setShowDetailModal(true);
  };

  if (!user) return <Login />;

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loader2 className="spin" size={32} color="var(--primary)" />
    </div>
  );

  return (
    <div className="app-container">
      <div className="sticky-top-area">
        <header className="glass" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '-0.5px' }}>
            <MapIcon size={24} color="var(--primary)" />
            Territorium
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn btn-secondary clickable" onClick={() => setShowStats(!showStats)} title="Statistiche" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: showStats ? 'var(--primary)' : 'inherit', borderColor: showStats ? 'var(--primary)' : 'var(--border-medium)' }}>
              <PieChartIcon size={18} />
            </button>
            <button className="btn btn-secondary clickable" onClick={fetchData} title="Ricarica" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
            <button className="btn btn-secondary clickable" onClick={signOut} title="Esci" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {activeTab !== 'storico' && (
              <select className="filter-select clickable" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
                <option value="">Paese</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
            {activeTab === 'disponibili' ? (
              <select className="filter-select clickable" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">Tipo</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            ) : activeTab === 'lavorazione' ? (
              <select className="filter-select clickable" value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)}>
                <option value="">Incaricato</option>
                {USERS_LIST.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
              </select>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-card)', padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--border-medium)' }}>
                <input type="date" value={historyStart} onChange={(e) => setHistoryStart(e.target.value)} style={{ background: 'transparent', border: 'none', fontSize: '13px', outline: 'none' }} />
                <ChevronRight size={12} color="var(--text-muted)" />
                <input type="date" value={historyEnd} onChange={(e) => setHistoryEnd(e.target.value)} style={{ background: 'transparent', border: 'none', fontSize: '13px', outline: 'none' }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showStats && <StatsView territori={territori} assignments={assignments} onClose={() => setShowStats(false)} />}

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
          filteredWorking.map(a => (
            <div key={a.id} className="card clickable" onClick={() => openDetail(a.territory)}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>{a.territory.country} <span style={{ color: 'var(--primary)' }}>#{a.territory.number}</span></h3>
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
          ))
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
                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Istruzioni Speciali</label>
                <textarea className="search-input" style={{ width: '100%', height: '100px' }} value={editNotes} onChange={e => setEditNotes(e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                {selectedTerritory?.is_available ? (
                  <button className="btn btn-primary clickable" style={{ flex: 2 }} onClick={() => { setShowDetailModal(false); setShowAssignModal(true); }}>Assegna</button>
                ) : (
                  <button className="btn btn-primary clickable" style={{ flex: 2 }} onClick={handleSaveNotes}>Salva Note</button>
                )}
                <button className="btn btn-secondary clickable" style={{ border: '1px solid #FEE2E2', color: '#DC2626', flex: 1 }} onClick={() => handleDeleteTerritory(selectedTerritory.id)} title="Elimina">
                  Elimina
                </button>
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
                <select className="filter-select clickable" style={{ width: '100%' }} value={selectedTerritory?.id || ''} onChange={e => setSelectedTerritory(territori.find(t => t.id === e.target.value))}>
                  <option value="">Seleziona Mappa</option>
                  {territori.filter(t => t.is_available).map(t => <option key={t.id} value={t.id}>{t.country} #{t.number}</option>)}
                </select>
                <select className="filter-select clickable" style={{ width: '100%' }} value={selectedAssignee} onChange={e => setSelectedAssignee(e.target.value)}>
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
    const todo = filteredTerritories.filter(t =>
      t.is_available && (
        !t.last_return_date ||
        new Date(t.last_return_date) < rangeStart ||
        new Date(t.last_return_date) > rangeEnd
      )
    );

    return {
      working,
      finished,
      todo,
      chartData: [
        { name: 'In Lavorazione', value: working.length, color: 'var(--primary)', key: 'working', icon: <User size={16} /> },
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
                <Calendar size={14} /> Periodo di riferimento
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
                  <span><strong style={{ color: '#F59E0B' }}>Da assegnare</strong> — tutti i territori non rientrati nel periodo selezionato.</span>
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
                  <span><strong style={{ color: '#F59E0B' }}>Da assegnare</strong> — non rientrati nel periodo.</span>
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
