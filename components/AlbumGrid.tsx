import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '@/constants/theme';

// Mock data for albums
const getAlbums = (type: string) => {
  const albumSets = {
    new: [
      { id: '1', title: 'Dawn FM', artist: 'The Weeknd', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg', rating: 4.5 },
      { id: '2', title: 'Midnights', artist: 'Taylor Swift', image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg', rating: 4.8 },
      { id: '3', title: 'Harry\'s House', artist: 'Harry Styles', image: 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg', rating: 4.2 },
      { id: '4', title: 'Renaissance', artist: 'Beyoncé', image: 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg', rating: 4.9 },
    ],
    trending: [
      { id: '5', title: 'Mr. Morale', artist: 'Kendrick Lamar', image: 'https://images.pexels.com/photos/1918159/pexels-photo-1918159.jpeg', rating: 4.7 },
      { id: '6', title: 'Un Verano Sin Ti', artist: 'Bad Bunny', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg', rating: 4.6 },
      { id: '7', title: 'SOS', artist: 'SZA', image: 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg', rating: 4.4 },
      { id: '8', title: 'SOUR', artist: 'Olivia Rodrigo', image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg', rating: 4.3 },
    ],
    staff: [
      { id: '9', title: 'Blonde', artist: 'Frank Ocean', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg', rating: 4.9 },
      { id: '10', title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', image: 'https://images.pexels.com/photos/1918159/pexels-photo-1918159.jpeg', rating: 5.0 },
      { id: '11', title: 'Norman F* Rockwell', artist: 'Lana Del Rey', image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg', rating: 4.8 },
      { id: '12', title: 'Igor', artist: 'Tyler, The Creator', image: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg', rating: 4.7 },
    ],
    collection: [
      { id: '13', title: 'Folklore', artist: 'Taylor Swift', image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg', rating: 4.6 },
      { id: '14', title: 'After Hours', artist: 'The Weeknd', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg', rating: 4.7 },
      { id: '15', title: 'Future Nostalgia', artist: 'Dua Lipa', image: 'https://images.pexels.com/photos/1587/blurred-background-close-up-concert-equipment.jpg', rating: 4.5 },
      { id: '16', title: 'Fine Line', artist: 'Harry Styles', image: 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg', rating: 4.4 },
    ],
    favorites: [
      { id: '17', title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar', image: 'https://images.pexels.com/photos/1918159/pexels-photo-1918159.jpeg', rating: 5.0 },
      { id: '18', title: 'Melodrama', artist: 'Lorde', image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg', rating: 4.9 },
      { id: '19', title: 'When We All Fall Asleep', artist: 'Billie Eilish', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg', rating: 4.8 },
      { id: '20', title: 'Channel Orange', artist: 'Frank Ocean', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg', rating: 4.9 },
    ],
  };
  
  return albumSets[type as keyof typeof albumSets] || [];
};

interface AlbumGridProps {
  type: string;
}

export default function AlbumGrid({ type }: AlbumGridProps) {
  const albums = getAlbums(type);
  
  const renderAlbum = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.albumCard}>
      <Image source={{ uri: item.image }} style={styles.albumImage} />
      <Text numberOfLines={1} style={styles.albumTitle}>{item.title}</Text>
      <Text numberOfLines={1} style={styles.albumArtist}>{item.artist}</Text>
      <View style={styles.ratingContainer}>
        <Star size={14} color={colors.primary} fill={colors.primary} />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={albums}
      renderItem={renderAlbum}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  albumCard: {
    width: 150,
    marginRight: 16,
  },
  albumImage: {
    width: 150,
    height: 150,
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