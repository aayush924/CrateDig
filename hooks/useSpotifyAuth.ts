import { useState, useEffect } from 'react';
import { getSpotifyAuthToken, authenticateSpotify } from '@/lib/spotify';

export function useSpotifyAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      setLoading(true);
      const storedToken = await getSpotifyAuthToken();
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (err) {
      setError('Failed to check authentication');
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    try {
      setLoading(true);
      const newToken = await authenticateSpotify();
      if (newToken) {
        setToken(newToken);
        setError(null);
      } else {
        setError('Authentication failed');
      }
    } catch (err) {
      setError('Failed to authenticate');
    } finally {
      setLoading(false);
    }
  }

  return {
    token,
    loading,
    error,
    login,
    checkAuth
  };
}