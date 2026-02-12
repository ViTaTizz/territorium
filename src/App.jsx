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
  RefreshCw
} from 'lucide-react';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', padding: '16px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: 'var(--login-padding, 40px)' }}>
        <style dangerouslySetInnerHTML={{
          __html: `
          @media (max-width: 640px) {
            .card { --login-padding: 24px; }
          }
        `}} />
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '48px', height: '48px', background: 'var(--primary-soft)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--primary)' }}>
            <MapIcon size={24} />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0' }}>Gestione Mappe</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Accedi per gestire i territori</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              className="search-input"
              style={{ width: '100%', paddingLeft: '16px' }}
              placeholder="nome@esempio.it"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Password</label>
            <input
              type="password"
              className="search-input"
              style={{ width: '100%', paddingLeft: '16px' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div style={{ fontSize: '13px', color: '#B91C1C', textAlign: 'center' }}>{error}</div>}

          <button type="submit" className="btn btn-primary clickable" style={{ width: '100%', height: '48px', fontSize: '16px' }} disabled={isLoggingIn}>
            {isLoggingIn ? <Loader2 className="spin" size={20} /> : 'Accedi'}
          </button>
        </form>
      </div>
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

  const filteredHistory = useMemo(() => {
    return assignments
      .filter(a => a.is_completed)
      .map(a => ({
        ...a,
        territory: territori.find(t => t.id === a.territory_id),
      }))
      .filter(a => a.territory)
      .filter(a => {
        if (!historyStart && !historyEnd) return true;
        const rDate = new Date(a.return_date);
        const start = historyStart ? new Date(historyStart) : new Date('1900-01-01');
        const end = historyEnd ? new Date(historyEnd) : new Date('2100-01-01');
        return rDate >= start && rDate <= end;
      })
      .filter(a => (searchQuery === '' || a.territory.country.toLowerCase().includes(searchQuery.toLowerCase()) || a.territory.number.includes(searchQuery) || a.assignee_name.toLowerCase().includes(searchQuery.toLowerCase())))
      .sort((a, b) => new Date(b.return_date) - new Date(a.return_date));
  }, [assignments, territori, historyStart, historyEnd, searchQuery]);

  const stats = useMemo(() => {
    const total = filteredHistory.length;
    const uniqueTerritories = new Set(filteredHistory.map(a => a.territory_id)).size;
    return { total, uniqueTerritories };
  }, [filteredHistory]);

  const handleAssign = async () => {
    if (!selectedTerritory || !selectedAssignee) return;

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
            <button className="btn btn-secondary clickable" onClick={fetchData} title="Ricarica" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={18} className={loading ? 'spin' : ''} />
            </button>
            <button className="btn btn-secondary clickable" onClick={signOut} title="Esci" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <div className="tabs-container">
          {['disponibili', 'lavorazione', 'storico'].map(tab => (
            <div key={tab} className={`tab clickable ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('lavorazione', 'In Lavorazione')}
            </div>
          ))}
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="stat-card"><div className="stat-value">{stats.total}</div><div className="stat-label">Coperture Totali</div></div>
              <div className="stat-card"><div className="stat-value" style={{ color: 'var(--primary)' }}>{stats.uniqueTerritories}</div><div className="stat-label">Territori</div></div>
            </div>
            {filteredHistory.map(h => (
              <div key={h.id} className="card clickable" onClick={() => openDetail(h.territory)}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>{h.territory.country} <span style={{ color: 'var(--primary)' }}>#{h.territory.number}</span></h3>
                <div style={{ fontWeight: 500, marginBottom: '12px' }}>{h.assignee_name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-light)', fontSize: '12px' }}>
                  <div style={{ color: 'var(--text-muted)' }}>{new Date(h.assignment_date).toLocaleDateString('it-IT')}</div>
                  <ChevronRight size={10} color="var(--text-muted)" />
                  <div style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14} /> {new Date(h.return_date).toLocaleDateString('it-IT')}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Modals */}
      {showDetailModal && (
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
      )}

      {showAssignModal && (
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
      )}

      {showReturnModal && (
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
      )}

      {showAddModal && (
        <AddTerritoryModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTerritory}
        />
      )}
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
