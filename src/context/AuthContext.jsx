import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const inactivityTimer = useRef(null);

    const performSignOut = useCallback(async () => {
        await supabase.auth.signOut();
        setUser(null);
    }, []);

    // Reset inactivity timer on user interaction
    const resetTimer = useCallback(() => {
        if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            performSignOut();
        }, INACTIVITY_TIMEOUT);
    }, [performSignOut]);

    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // Listen for changes on auth state (sign in, sign out, etc.)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Inactivity timeout + beforeunload
    useEffect(() => {
        if (!user) {
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
            return;
        }

        // Start inactivity timer
        resetTimer();

        // Reset on user activity
        const events = ['mousedown', 'keydown', 'touchstart', 'scroll'];
        events.forEach(e => window.addEventListener(e, resetTimer));

        // Sign out when closing browser/tab
        const handleBeforeUnload = () => {
            navigator.sendBeacon && supabase.auth.signOut();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            events.forEach(e => window.removeEventListener(e, resetTimer));
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
        };
    }, [user, resetTimer]);

    const signIn = (email, password) => supabase.auth.signInWithPassword({ email, password });
    const signOut = () => performSignOut();

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
