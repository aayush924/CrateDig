import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Search, Star, X } from 'lucide-react-native';
import Header from '@/components/Header';
import { colors } from '@/constants/theme';

// Mock data for search results
const searchResults = [
  { id: '1', title: 'Melodrama', artist: 'Lorde', image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg' },
  { id: '2', title: 'When We All Fall Asleep', artist: 'Billie Eilish', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' },
  { id: '3', title: 'After Hours', artist: 'The Weeknd', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg' },
  { id: '4', title: 'Future Nostalgia', artist: 'Dua Lipa', image: 'https://images.pexels.com/photos/1587/blurred-background-close-up-concert-equipment.jpg' },
];

export default function AddScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      setSearching(true);
    }
  };

  const handleAlbumSelect = (album: any) => {
    setSelectedAlbum(album);
    setSearching(false);
  };

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleClearAlbum = () => {
    setSelectedAlbum(null);
    setRating(0);
    setReview('');
  };

  const handleSubmit = () => {
    if (selectedAlbum && rating > 0) {
      // Submit the review
      console.log({
        albumId: selectedAlbum.id,
        rating,
        review,
      });
      
      // Reset form
      setSelectedAlbum(null);
      setRating(0);
      setReview('');
      setSearchQuery('');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Log Album" />
      <ScrollView style={styles.scrollView}>
        {!selectedAlbum ? (
          <>
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Search size={20} color={colors.textSecondary} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for an album or artist"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={handleSearch}
                  placeholderTextColor={colors.textSecondary}
                  returnKeyType="search"
                />
              </View>
            </View>

            {searching && (
              <View style={styles.searchResults}>
                <Text style={styles.resultsTitle}>Results</Text>
                {searchResults.map(album => (
                  <TouchableOpacity
                    key={album.id}
                    style={styles.resultItem}
                    onPress={() => handleAlbumSelect(album)}
                  >
                    <Image source={{ uri: album.image }} style={styles.resultImage} />
                    <View style={styles.resultInfo}>
                      <Text style={styles.resultTitle}>{album.title}</Text>
                      <Text style={styles.resultArtist}>{album.artist}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {!searching && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateTitle}>Find an album to log</Text>
                <Text style={styles.emptyStateText}>
                  Search for an album to add it to your collection and share your thoughts
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.section}>
            <View style={styles.selectedAlbumHeader}>
              <View style={styles.selectedAlbum}>
                <Image source={{ uri: selectedAlbum.image }} style={styles.selectedAlbumImage} />
                <View style={styles.selectedAlbumInfo}>
                  <Text style={styles.selectedAlbumTitle}>{selectedAlbum.title}</Text>
                  <Text style={styles.selectedAlbumArtist}>{selectedAlbum.artist}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleClearAlbum}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Rate and Review</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  onPress={() => handleRating(star)}
                  style={styles.starButton}
                >
                  <Star 
                    size={32} 
                    color={star <= rating ? colors.primary : colors.border}
                    fill={star <= rating ? colors.primary : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.reviewContainer}>
              <TextInput
                style={styles.reviewInput}
                placeholder="Write your review here..."
                multiline
                numberOfLines={5}
                placeholderTextColor={colors.textSecondary}
                value={review}
                onChangeText={setReview}
              />
            </View>
            
            <TouchableOpacity 
              style={[
                styles.submitButton,
                rating === 0 && styles.disabledButton
              ]} 
              onPress={handleSubmit}
              disabled={rating === 0}
            >
              <Text style={styles.submitButtonText}>Log Album</Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text,
  },
  searchResults: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  resultsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  resultInfo: {
    marginLeft: 16,
    flex: 1,
  },
  resultTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  resultArtist: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 48,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
    marginBottom: 8,
  },
  emptyStateText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  selectedAlbumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 16,
  },
  selectedAlbum: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedAlbumImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  selectedAlbumInfo: {
    marginLeft: 16,
    flex: 1,
  },
  selectedAlbumTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
  },
  selectedAlbumArtist: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  starButton: {
    marginHorizontal: 8,
  },
  reviewContainer: {
    marginVertical: 16,
  },
  reviewInput: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text,
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  submitButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
});