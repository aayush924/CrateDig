import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/theme';

// Mock data for genres
const genreData = [
  { id: 'pop', name: 'Pop' },
  { id: 'hiphop', name: 'Hip Hop' },
  { id: 'indie', name: 'Indie' },
  { id: 'rock', name: 'Rock' },
  { id: 'rnb', name: 'R&B' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'metal', name: 'Metal' },
  { id: 'classical', name: 'Classical' },
  { id: 'country', name: 'Country' },
];

export default function GenreList() {
  const renderGenreItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.genreButton}>
      <Text style={styles.genreText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={genreData}
      renderItem={renderGenreItem}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  genreButton: {
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  genreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
  },
});