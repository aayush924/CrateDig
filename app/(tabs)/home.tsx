import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import { getFeaturedPlaylists, getRecentlyPlayed, getTopArtists } from '@/lib/spotify';
import { colors } from '@/constants/theme';

const HomeScreen = () => {
  const router = useRouter();
  const { token, loading: authLoading, login } = useSpotifyAuth();
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchSpotifyData();
    }
  }, [token]);

  const fetchSpotifyData = async () => {
    try {
      setLoading(true);
      const [playlists, recent, artists] = await Promise.all([
        getFeaturedPlaylists(token),
        getRecentlyPlayed(token),
        getTopArtists(token)
      ]);

      setFeaturedPlaylists(playlists.playlists.items);
      setRecentlyPlayed(recent.items);
      setTopArtists(artists.items);
    } catch (err) {
      setError('Failed to load music data');
    } finally {
      setLoading(false);
    }
  };

  const handlePressAlbum = (albumId: string) => {
    router.push(`/album/${albumId}`);
  };

  const renderSection = (title: string, data: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handlePressAlbum(item.id)}
          >
            <Image 
              source={{ uri: item.images?.[0]?.url || 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg' }} 
              style={styles.albumArt} 
            />
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.artists && (
              <Text style={styles.cardSubtitle}>
                {item.artists.map((artist: any) => artist.name).join(', ')}
              </Text>
            )}
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  if (authLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!token) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authTitle}>Connect with Spotify</Text>
        <Text style={styles.authSubtitle}>
          Sign in to access your music library and discover new tracks
        </Text>
        <TouchableOpacity style={styles.authButton} onPress={login}>
          <Text style={styles.authButtonText}>Connect Spotify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>
          <Text style={{ color: colors.primary }}>CRATE</Text>DIG
        </Text>
        <Settings color={colors.text} size={24} />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchSpotifyData}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {renderSection('Featured Playlists', featuredPlaylists)}
          {renderSection('Recently Played', recentlyPlayed.map((item: any) => item.track))}
          {renderSection('Top Artists', topArtists)}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  authTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.text,
    marginBottom: 12,
  },
  authSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  authButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  authButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
  navbar: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.text,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    marginBottom: 12,
    color: colors.text,
  },
  card: {
    marginRight: 12,
    width: 140,
  },
  albumArt: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  cardSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  retryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.buttonText,
  },
});

export default HomeScreen;