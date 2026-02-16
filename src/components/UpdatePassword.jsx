import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, CheckCircle, Loader2 } from 'lucide-react';

export default function UpdatePassword({ onCancel }) {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.updateUser({
            password: password,
            data: { password_set: true }
        });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            // Wait a bit then reload to go to app or clear recovery mode
            setTimeout(() => {
                // We reload to clear any URL fragments and reset app state
                window.location.href = '/';
            }, 2000);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', background: 'var(--bg-app)' }}>
                <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '40px', textAlign: 'center' }}>
                    <CheckCircle size={48} color="#10B981" style={{ marginBottom: '16px' }} />
                    <h2 style={{ marginBottom: '8px' }}>Password Aggiornata!</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Accesso in corso...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', background: 'var(--bg-app)' }}>
            <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'white' }}>
                        <Lock size={24} />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>Imposta Password</h1>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                        Inserisci la tua nuova password per accedere.
                    </p>
                </div>

                <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <input
                            type="password"
                            className="search-input"
                            placeholder="Nuova Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            disabled={loading}
                            style={{ padding: '12px' }}
                        />
                    </div>

                    {error && (
                        <div style={{ padding: '10px', background: '#FEF2F2', color: '#DC2626', borderRadius: '8px', fontSize: '13px' }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary clickable"
                        disabled={loading}
                        style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '15px' }}
                    >
                        {loading ? <Loader2 className="spin" size={20} /> : 'Salva e Accedi'}
                    </button>
                    {onCancel && (
                        <button
                            type="button"
                            className="btn btn-secondary clickable"
                            onClick={onCancel}
                            disabled={loading}
                            style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '15px' }}
                        >
                            Annulla
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}
