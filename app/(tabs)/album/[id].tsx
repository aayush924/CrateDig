import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AlbumDetail from '@/components/AlbumDetail';
import ReviewList from '@/components/ReviewList';
import { colors } from '@/constants/theme';

// Mock data for album details
const albumData = {
  id: '1',
  title: 'Melodrama',
  artist: 'Lorde',
  image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg',
  releaseYear: '2017',
  genre: 'Pop',
  averageRating: 4.7,
  totalReviews: 1528,
  totalListens: 15243,
  description: 'Melodrama is the second studio album by New Zealand singer-songwriter Lorde, released through Republic Records on June 16, 2017. Following the success of her debut album Pure Heroine, Lorde retreated from public spotlight, and traveled between New Zealand and the United States to write the album.',
};

// Mock data for reviews
const reviewsData = [
  {
    id: '1',
    user: {
      id: '101',
      username: 'musiclover42',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    rating: 5,
    content: 'A masterpiece that captures the essence of young adulthood. Every track is brilliant, from the opening notes of "Green Light" to the final moments of "Perfect Places."',
    timestamp: '2 weeks ago',
    likes: 42,
    comments: 8,
  },
  {
    id: '2',
    user: {
      id: '102',
      username: 'beatmaster',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    rating: 4.5,
    content: 'The production on this album is incredible. Jack Antonoff and Lorde created something truly special here. "Liability" still makes me emotional every time I hear it.',
    timestamp: '1 month ago',
    likes: 31,
    comments: 5,
  },
  {
    id: '3',
    user: {
      id: '103',
      username: 'vinylcollector',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    rating: 5,
    content: 'One of the best pop albums of the decade. The songwriting is mature beyond her years, and the sonic landscape is both experimental and accessible.',
    timestamp: '2 months ago',
    likes: 56,
    comments: 12,
  },
];

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams();
  const [showReviews, setShowReviews] = useState(false);
  
  // In a real app, fetch album details based on id
  const album = albumData;
  
  const handleAddToCollection = () => {
    // Logic to add album to collection
    console.log('Add to collection:', id);
  };
  
  const handleShareAlbum = () => {
    // Logic to share album
    console.log('Share album:', id);
  };
  
  const handleViewReviews = () => {
    // Toggle reviews section
    setShowReviews(true);
  };
  
  const handleWriteReview = () => {
    // Navigate to write review screen
    console.log('Write review for:', id);
  };
  
  const handleLikeReview = (reviewId: string) => {
    console.log('Like review:', reviewId);
  };
  
  const handleCommentReview = (reviewId: string) => {
    console.log('Comment on review:', reviewId);
  };
  
  const handleViewProfile = (userId: string) => {
    console.log('View profile:', userId);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <AlbumDetail 
          album={album}
          onAddToCollection={handleAddToCollection}
          onShareAlbum={handleShareAlbum}
          onViewReviews={handleViewReviews}
          onWriteReview={handleWriteReview}
        />
        
        {showReviews && (
          <ReviewList 
            reviews={reviewsData}
            onLikeReview={handleLikeReview}
            onCommentReview={handleCommentReview}
            onViewProfile={handleViewProfile}
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
});