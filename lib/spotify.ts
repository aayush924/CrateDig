import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENT_ID = '22cda0aba4b84eb98a0fb4df597ef0a1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative'
];

const REDIRECT_URI = makeRedirectUri({
  scheme: 'cratedig'
});

export async function getSpotifyAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem('spotify_token');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

export async function authenticateSpotify() {
  try {
    const authUrl = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(SCOPES.join(' '))}`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);

    if (result.type === 'success') {
      const params = new URLSearchParams(result.url.split('#')[1]);
      const token = params.get('access_token');
      if (token) {
        await AsyncStorage.setItem('spotify_token', token);
        return token;
      }
    }
    return null;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function fetchSpotifyApi(endpoint: string, token: string) {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, clear it
        await AsyncStorage.removeItem('spotify_token');
      }
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

export async function getRecentlyPlayed(token: string) {
  return fetchSpotifyApi('/me/player/recently-played?limit=20', token);
}

export async function getFeaturedPlaylists(token: string) {
  return fetchSpotifyApi('/browse/featured-playlists?limit=10', token);
}

export async function getTopArtists(token: string) {
  return fetchSpotifyApi('/me/top/artists?limit=10', token);
}

export async function getAlbumDetails(token: string, albumId: string) {
  return fetchSpotifyApi(`/albums/${albumId}`, token);
}