import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth';
import AlbumDetail from '@/components/AlbumDetail';
import ReviewList from '@/components/ReviewList';
import { colors } from '@/constants/theme';
import { getAlbumDetails } from '@/lib/spotify';

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams();
  const { token } = useSpotifyAuth();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviews, setShowReviews] = useState(false);
  
  useEffect(() => {
    if (token && id) {
      fetchAlbumDetails();
    }
  }, [token, id]);
  
  const fetchAlbumDetails = async () => {
    try {
      setLoading(true);
      const data = await getAlbumDetails(token, id as string);
      setAlbum(data);
    } catch (err) {
      setError('Failed to load album details');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddToCollection = () => {
    // Implement add to collection functionality
    console.log('Add to collection:', id);
  };
  
  const handleShareAlbum = () => {
    // Implement share functionality
    console.log('Share album:', id);
  };
  
  const handleViewReviews = () => {
    setShowReviews(true);
  };
  
  const handleWriteReview = () => {
    // Navigate to write review screen
    console.log('Write review for:', id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error || !album) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error || 'Album not found'}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchAlbumDetails}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <AlbumDetail 
          album={{
            id: album.id,
            title: album.name,
            artist: album.artists[0].name,
            image: album.images[0].url,
            releaseYear: new Date(album.release_date).getFullYear().toString(),
            genre: album.genres[0] || 'Unknown',
            averageRating: album.popularity / 20, // Convert popularity to 5-star scale
            totalReviews: Math.floor(album.popularity * 10),
            totalListens: album.popularity * 1000,
            description: album.description || `${album.name} is an album by ${album.artists[0].name}, released on ${album.release_date}.`,
          }}
          onAddToCollection={handleAddToCollection}
          onShareAlbum={handleShareAlbum}
          onViewReviews={handleViewReviews}
          onWriteReview={handleWriteReview}
        />
        
        {showReviews && (
          <ReviewList 
            reviews={[]} // Implement real reviews later
            onLikeReview={() => {}}
            onCommentReview={() => {}}
            onViewProfile={() => {}}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
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