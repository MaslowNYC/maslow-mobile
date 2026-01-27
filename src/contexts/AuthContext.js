import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFounder, setIsFounder] = useState(false);

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          checkFounderStatus(session.user.id);
        }
      } catch (err) {
        console.error('Session check failed', err);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkFounderStatus(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkFounderStatus = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single();

      if (data && data.is_admin) {
        setIsFounder(true);
      } else {
        setIsFounder(false);
      }
    } catch (error) {
      console.error('Founder check failed:', error);
    }
  };

  const signUp = async (data) => {
    try {
      return await supabase.auth.signUp(data);
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (data) => {
    try {
      return await supabase.auth.signInWithPassword(data);
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      return await supabase.auth.signOut();
    } catch (error) {
      return { error };
    }
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
    loading,
    isFounder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
