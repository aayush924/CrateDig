import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { X, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import OnboardingPagination from '@/components/OnboardingPagination';
import { colors } from '@/constants/theme';

// Mock data for popular artists
const popularArtists = [
  { id: '1', name: 'Taylor Swift', image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg' },
  { id: '2', name: 'Ariana Grande', image: 'https://images.pexels.com/photos/1308885/pexels-photo-1308885.jpeg' },
  { id: '3', name: 'Drake', image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg' },
  { id: '4', name: 'The Weeknd', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg' },
  { id: '5', name: 'Ed Sheeran', image: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg' },
  { id: '6', name: 'Billie Eilish', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' },
  { id: '7', name: 'Justin Bieber', image: 'https://images.pexels.com/photos/1486064/pexels-photo-1486064.jpeg' },
  { id: '8', name: 'Kendrick Lamar', image: 'https://images.pexels.com/photos/1918159/pexels-photo-1918159.jpeg' },
  { id: '9', name: 'Lana Del Rey', image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg' },
  { id: '10', name: 'Rihanna', image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg' },
  { id: '11', name: 'Post Malone', image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg' },
  { id: '12', name: 'Dua Lipa', image: 'https://images.pexels.com/photos/1587/blurred-background-close-up-concert-equipment.jpg' },
];

export default function ArtistsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  
  const toggleArtist = (artistId: string) => {
    if (selectedArtists.includes(artistId)) {
      setSelectedArtists(selectedArtists.filter(id => id !== artistId));
    } else {
      setSelectedArtists([...selectedArtists, artistId]);
    }
  };
  
  const handleContinue = () => {
    router.push('/onboarding/username');
  };
  
  const handleSkip = () => {
    router.push('/onboarding/username');
  };
  
  const handleClose = () => {
    router.push('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find your favorite artists</Text>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for artists"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Popular artists in these genres</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.artistsGrid}>
          {popularArtists.map(artist => (
            <TouchableOpacity
              key={artist.id}
              style={styles.artistCard}
              onPress={() => toggleArtist(artist.id)}
            >
              <View style={[
                styles.artistImageContainer,
                selectedArtists.includes(artist.id) && styles.selectedArtistBorder
              ]}>
                <Image source={{ uri: artist.image }} style={styles.artistImage} />
                {selectedArtists.includes(artist.id) && (
                  <View style={styles.selectedOverlay}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            selectedArtists.length === 0 && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={selectedArtists.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.paginationContainer}>
        <OnboardingPagination currentPage={3} totalPages={6} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
  },
  closeButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
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
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  artistsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  artistCard: {
    width: '25%',
    padding: 4,
    marginBottom: 8,
  },
  artistImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1,
  },
  selectedArtistBorder: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  artistImage: {
    width: '100%',
    height: '100%',
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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