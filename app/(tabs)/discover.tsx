import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import Header from '@/components/Header';
import AlbumGrid from '@/components/AlbumGrid';
import GenreList from '@/components/GenreList';
import { colors } from '@/constants/theme';

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <Header title="Discover" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for albums, artists, or users"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Genre</Text>
          <GenreList />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <AlbumGrid type="new" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending This Week</Text>
          <AlbumGrid type="trending" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Staff Picks</Text>
          <AlbumGrid type="staff" />
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});