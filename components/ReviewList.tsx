import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Star, Heart, MessageCircle } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface Review {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  rating: number;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

interface ReviewListProps {
  reviews: Review[];
  onLikeReview?: (reviewId: string) => void;
  onCommentReview?: (reviewId: string) => void;
  onViewProfile?: (userId: string) => void;
}

export default function ReviewList({
  reviews,
  onLikeReview,
  onCommentReview,
  onViewProfile
}: ReviewListProps) {
  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={16}
            color={index < Math.floor(rating) ? colors.primary : colors.border}
            fill={index < Math.floor(rating) ? colors.primary : 'transparent'}
          />
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <TouchableOpacity onPress={() => onViewProfile?.(item.user.id)}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.reviewHeaderContent}>
          <TouchableOpacity onPress={() => onViewProfile?.(item.user.id)}>
            <Text style={styles.username}>{item.user.username}</Text>
          </TouchableOpacity>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
      
      <View style={styles.reviewContent}>
        {renderStars(item.rating)}
        <Text style={styles.reviewText}>{item.content}</Text>
      </View>
      
      <View style={styles.reviewActions}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onLikeReview?.(item.id)}
        >
          <Heart size={18} color={colors.textSecondary} />
          <Text style={styles.actionButtonText}>{item.likes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onCommentReview?.(item.id)}
        >
          <MessageCircle size={18} color={colors.textSecondary} />
          <Text style={styles.actionButtonText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderReviewItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  reviewContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewHeaderContent: {
    marginLeft: 12,
    flex: 1,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  timestamp: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
  reviewContent: {
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  reviewActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
});