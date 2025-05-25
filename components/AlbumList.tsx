import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface Album {
  id: string;
  title: string;
  artist: string;
  image: string;
  rating?: number;
}

interface AlbumListProps {
  albums: Album[];
  onPressAlbum: (albumId: string) => void;
  title?: string;
  horizontal?: boolean;
}

export default function AlbumList({
  albums,
  onPressAlbum,
  title,
  horizontal = true
}: AlbumListProps) {
  const renderAlbum = ({ item }: { item: Album }) => (
    <TouchableOpacity
      style={horizontal ? styles.albumCardHorizontal : styles.albumCardGrid}
      onPress={() => onPressAlbum(item.id)}
    >
      <Image source={{ uri: item.image }} style={horizontal ? styles.albumImageHorizontal : styles.albumImageGrid} />
      <Text numberOfLines={1} style={styles.albumTitle}>{item.title}</Text>
      <Text numberOfLines={1} style={styles.albumArtist}>{item.artist}</Text>
      {item.rating !== undefined && (
        <View style={styles.ratingContainer}>
          <Star size={14} color={colors.primary} fill={colors.primary} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={item => item.id}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        numColumns={horizontal ? 1 : 2}
        key={horizontal ? 'horizontal' : 'grid'}
        contentContainerStyle={horizontal ? styles.listContainerHorizontal : styles.listContainerGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContainerHorizontal: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  listContainerGrid: {
    paddingHorizontal: 16,
  },
  albumCardHorizontal: {
    width: 150,
    marginRight: 16,
    marginBottom: 8,
  },
  albumCardGrid: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    maxWidth: '45%',
  },
  albumImageHorizontal: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumImageGrid: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  albumTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  albumArtist: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});