import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import OnboardingPagination from '@/components/OnboardingPagination';
import { colors } from '@/constants/theme';

const genreData = [
  { id: 'pop', name: 'Pop' },
  { id: 'hiphop', name: 'Hip Hop' },
  { id: 'indie', name: 'Indie' },
  { id: 'rock', name: 'Rock' },
  { id: 'rap', name: 'Rap' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'classical', name: 'Classical' },
  { id: 'rnb', name: 'R&B' },
  { id: 'metal', name: 'Metal' },
];

// Mock image data for suggested genres
const suggestionImages = [
  { id: '1', url: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg', genre: 'Indie Rock' },
  { id: '2', url: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg', genre: 'Dance' },
  { id: '3', url: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg', genre: 'Country' },
  { id: '4', url: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg', genre: 'Instruments' },
  { id: '5', url: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg', genre: 'Hip Hop' },
];

export default function GenresScreen() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  
  const toggleGenre = (genreId: string) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };
  
  const handleContinue = () => {
    router.push('/onboarding/artists');
  };
  
  const handleSkip = () => {
    router.push('/onboarding/artists');
  };
  
  const handleClose = () => {
    router.push('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>What do you like to listen to?</Text>
          <Text style={styles.subtitle}>
            We'll use this to recommend playlists and podcasts especially for you.
          </Text>
          
          <View style={styles.suggestionsContainer}>
            <Text style={styles.sectionTitle}>Suggested for you</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
              {suggestionImages.map(item => (
                <View key={item.id} style={styles.suggestionCard}>
                  <Image source={{ uri: item.url }} style={styles.suggestionImage} />
                  <Text numberOfLines={1} style={styles.suggestionText}>{item.genre}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.genresContainer}>
            <Text style={styles.sectionTitle}>All genres</Text>
            <View style={styles.genreGrid}>
              {genreData.map(genre => (
                <TouchableOpacity
                  key={genre.id}
                  style={[
                    styles.genreButton,
                    selectedGenres.includes(genre.id) && styles.selectedGenreButton,
                  ]}
                  onPress={() => toggleGenre(genre.id)}
                >
                  <Text
                    style={[
                      styles.genreButtonText,
                      selectedGenres.includes(genre.id) && styles.selectedGenreButtonText,
                    ]}
                  >
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedGenres.length === 0 && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={selectedGenres.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.paginationContainer}>
        <OnboardingPagination currentPage={2} totalPages={6} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  suggestionsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
  },
  suggestionsScroll: {
    marginLeft: -8,
  },
  suggestionCard: {
    marginHorizontal: 8,
    width: 160,
  },
  suggestionImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
  },
  genresContainer: {
    marginBottom: 32,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  genreButton: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedGenreButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genreButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
  },
  selectedGenreButtonText: {
    color: colors.buttonText,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  skipButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.text,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  continueButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
  paginationContainer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});