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
        } else {
          // Reset founder status when no user session
          setIsFounder(false);
        }
      } catch (err) {
        console.error('Session check failed', err);
        setIsFounder(false); // Reset on error
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
      } else {
        // Reset founder status when user logs out
        setIsFounder(false);
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

      // Reset to false on any error or missing data
      if (error || !data) {
        setIsFounder(false);
        if (error) {
          console.error('Founder check failed:', error);
        }
        return;
      }

      // Only set to true if explicitly is_admin is true
      setIsFounder(data.is_admin === true);
    } catch (error) {
      // Reset to false on any exception
      console.error('Founder check failed:', error);
      setIsFounder(false);
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
