import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Star, MessageCircle, Heart, Share2, Plus } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface AlbumDetailProps {
  album: {
    id: string;
    title: string;
    artist: string;
    image: string;
    releaseYear: string;
    genre: string;
    averageRating: number;
    totalReviews: number;
    totalListens: number;
    description?: string;
  };
  onAddToCollection?: () => void;
  onShareAlbum?: () => void;
  onViewReviews?: () => void;
  onWriteReview?: () => void;
}

export default function AlbumDetail({
  album,
  onAddToCollection,
  onShareAlbum,
  onViewReviews,
  onWriteReview
}: AlbumDetailProps) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.albumHeader}>
        <Image source={{ uri: album.image }} style={styles.albumCover} />
        
        <View style={styles.albumInfo}>
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumArtist}>{album.artist}</Text>
          <Text style={styles.albumMeta}>{album.releaseYear} • {album.genre}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color={colors.primary} fill={colors.primary} />
            <Text style={styles.ratingText}>
              {album.averageRating.toFixed(1)} 
              <Text style={styles.reviewCount}>({album.totalReviews})</Text>
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={onAddToCollection}>
          <Plus size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onWriteReview}>
          <Star size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Review</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onViewReviews}>
          <MessageCircle size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Reviews</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={onShareAlbum}>
          <Share2 size={20} color={colors.text} />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
      
      {album.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>About this album</Text>
          <Text style={styles.descriptionText}>{album.description}</Text>
        </View>
      )}
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{album.totalListens.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Listens</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{album.totalReviews.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {(album.totalListens / 1000).toFixed(1)}K
          </Text>
          <Text style={styles.statLabel}>Impressions</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  albumHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
  },
  albumCover: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  albumInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  albumTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 2,
  },
  albumArtist: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  albumMeta: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  descriptionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.text,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
});