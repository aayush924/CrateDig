import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/theme';
import AlbumList from '@/components/AlbumList';

// Mock data
const topAlbums = [
  { id: '1', title: 'Melodrama', artist: 'Lorde', image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg', rating: 5.0 },
  { id: '2', title: 'After Hours', artist: 'The Weeknd', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg', rating: 4.5 },
  { id: '3', title: 'Blonde', artist: 'Frank Ocean', image: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg', rating: 5.0 },
  { id: '4', title: 'Midnights', artist: 'Taylor Swift', image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg', rating: 4.2 },
];

const topArtists = [
  { id: '1', name: 'Lorde', albums: 2, rating: 4.8 },
  { id: '2', name: 'Frank Ocean', albums: 3, rating: 4.9 },
  { id: '3', name: 'Kendrick Lamar', albums: 4, rating: 4.7 },
  { id: '4', name: 'Taylor Swift', albums: 5, rating: 4.3 },
  { id: '5', name: 'The Weeknd', albums: 3, rating: 4.5 },
];

const topGenres = [
  { id: '1', name: 'Pop', albums: 12, percentage: 35 },
  { id: '2', name: 'Hip Hop', albums: 8, percentage: 23 },
  { id: '3', name: 'Indie', albums: 7, percentage: 20 },
  { id: '4', name: 'R&B', albums: 5, percentage: 14 },
  { id: '5', name: 'Rock', albums: 3, percentage: 8 },
];

const listeningStats = {
  totalAlbums: 127,
  totalArtists: 84,
  totalListens: 1236,
  totalReviews: 72,
  averageRating: 3.8,
};

export default function StatsScreen() {
  const [timeframe, setTimeframe] = useState('all-time'); // 'all-time', 'year', 'month'
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    // In a real app, fetch stats for the selected timeframe
  };
  
  const handlePressAlbum = (albumId: string) => {
    // Navigate to album detail
    console.log('View album:', albumId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Stats</Text>
        <View style={styles.timeframeSelector}>
          <TouchableOpacity
            style={[styles.timeframeButton, timeframe === 'all-time' && styles.activeTimeframeButton]}
            onPress={() => handleTimeframeChange('all-time')}
          >
            <Text 
              style={[
                styles.timeframeButtonText, 
                timeframe === 'all-time' && styles.activeTimeframeButtonText
              ]}
            >
              All Time
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.timeframeButton, timeframe === 'year' && styles.activeTimeframeButton]}
            onPress={() => handleTimeframeChange('year')}
          >
            <Text 
              style={[
                styles.timeframeButtonText, 
                timeframe === 'year' && styles.activeTimeframeButtonText
              ]}
            >
              2024
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.timeframeButton, timeframe === 'month' && styles.activeTimeframeButton]}
            onPress={() => handleTimeframeChange('month')}
          >
            <Text 
              style={[
                styles.timeframeButtonText, 
                timeframe === 'month' && styles.activeTimeframeButtonText
              ]}
            >
              This Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.overviewCard}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{listeningStats.totalAlbums}</Text>
              <Text style={styles.statLabel}>Albums</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{listeningStats.totalArtists}</Text>
              <Text style={styles.statLabel}>Artists</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{listeningStats.totalListens}</Text>
              <Text style={styles.statLabel}>Listens</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{listeningStats.totalReviews}</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{listeningStats.averageRating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionHeading}>Top Albums</Text>
        <AlbumList 
          albums={topAlbums}
          onPressAlbum={handlePressAlbum}
          horizontal={true}
        />
        
        <Text style={styles.sectionHeading}>Top Artists</Text>
        <View style={styles.artistsContainer}>
          {topArtists.map((artist, index) => (
            <View key={artist.id} style={styles.artistItem}>
              <Text style={styles.artistRank}>{index + 1}</Text>
              <View style={styles.artistInfo}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <Text style={styles.artistMeta}>{artist.albums} albums • {artist.rating.toFixed(1)} avg</Text>
              </View>
            </View>
          ))}
        </View>
        
        <Text style={styles.sectionHeading}>Genre Breakdown</Text>
        <View style={styles.genresContainer}>
          {topGenres.map(genre => (
            <View key={genre.id} style={styles.genreItem}>
              <View style={styles.genreInfo}>
                <Text style={styles.genreName}>{genre.name}</Text>
                <Text style={styles.genreMeta}>{genre.albums} albums</Text>
              </View>
              <View style={styles.genreBarContainer}>
                <View 
                  style={[
                    styles.genreBar,
                    { width: `${genre.percentage}%` }
                  ]} 
                />
                <Text style={styles.genrePercentage}>{genre.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
    marginBottom: 16,
  },
  timeframeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
  },
  activeTimeframeButton: {
    backgroundColor: colors.primary,
  },
  timeframeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
  },
  activeTimeframeButtonText: {
    color: colors.buttonText,
  },
  scrollView: {
    flex: 1,
  },
  overviewCard: {
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  sectionHeading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  artistsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  artistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  artistRank: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.text,
    width: 30,
  },
  artistInfo: {
    flex: 1,
  },
  artistName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  artistMeta: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  genresContainer: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  genreItem: {
    marginBottom: 12,
  },
  genreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  genreName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  genreMeta: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  genreBarContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    position: 'relative',
  },
  genreBar: {
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  genrePercentage: {
    position: 'absolute',
    right: -36,
    top: -3,
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
});