import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Star, MessageCircle, Heart } from 'lucide-react-native';
import { colors } from '@/constants/theme';

// Mock data for activity feed
const activityData = [
  {
    id: '1',
    type: 'review',
    user: {
      id: '101',
      username: 'musiclover42',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    },
    album: {
      id: '201',
      title: 'Melodrama',
      artist: 'Lorde',
      image: 'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg',
    },
    rating: 4.5,
    review: 'A masterpiece that captures the essence of young adulthood. Every track is brilliant.',
    timestamp: '2h ago',
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    type: 'listened',
    user: {
      id: '102',
      username: 'beatmaster',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    },
    album: {
      id: '202',
      title: 'After Hours',
      artist: 'The Weeknd',
      image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg',
    },
    timestamp: '4h ago',
  },
  {
    id: '3',
    type: 'list',
    user: {
      id: '103',
      username: 'vinylcollector',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    },
    list: {
      id: '301',
      title: 'Best Albums of 2024 So Far',
      count: 12,
      image: 'https://images.pexels.com/photos/1021876/pexels-photo-1021876.jpeg',
    },
    timestamp: '8h ago',
    likes: 42,
    comments: 7,
  },
  {
    id: '4',
    type: 'review',
    user: {
      id: '104',
      username: 'soundscape',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    },
    album: {
      id: '203',
      title: 'SOUR',
      artist: 'Olivia Rodrigo',
      image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg',
    },
    rating: 4.0,
    review: 'An emotional rollercoaster that perfectly captures teenage angst and heartbreak.',
    timestamp: '1d ago',
    likes: 18,
    comments: 3,
  },
];

export default function ActivityFeed() {
  const renderActivityItem = ({ item }: { item: any }) => {
    if (item.type === 'review') {
      return (
        <View style={styles.activityCard}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
          
          <View style={styles.reviewContent}>
            <View style={styles.albumInfo}>
              <Image source={{ uri: item.album.image }} style={styles.albumThumbnail} />
              <View style={styles.albumTextContainer}>
                <Text style={styles.albumTitle}>{item.album.title}</Text>
                <Text style={styles.albumArtist}>{item.album.artist}</Text>
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      color={index < Math.floor(item.rating) ? colors.primary : colors.border}
                      fill={index < Math.floor(item.rating) ? colors.primary : 'transparent'}
                    />
                  ))}
                  {item.rating % 1 > 0 && (
                    <Star
                      size={16}
                      color={colors.primary}
                      fill={colors.primary}
                      style={{ opacity: 0.5 }}
                    />
                  )}
                </View>
              </View>
            </View>
            
            <Text style={styles.reviewText}>{item.review}</Text>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={20} color={colors.textSecondary} />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color={colors.textSecondary} />
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (item.type === 'listened') {
      return (
        <View style={styles.activityCard}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
          
          <View style={styles.listenedContent}>
            <Text style={styles.actionText}>listened to</Text>
            <View style={styles.albumInfo}>
              <Image source={{ uri: item.album.image }} style={styles.albumThumbnail} />
              <View style={styles.albumTextContainer}>
                <Text style={styles.albumTitle}>{item.album.title}</Text>
                <Text style={styles.albumArtist}>{item.album.artist}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else if (item.type === 'list') {
      return (
        <View style={styles.activityCard}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.nameContainer}>
              <Text style={styles.username}>{item.user.username}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
          
          <View style={styles.listContent}>
            <Text style={styles.actionText}>created a new list</Text>
            <View style={styles.listInfo}>
              <Image source={{ uri: item.list.image }} style={styles.listThumbnail} />
              <View style={styles.listTextContainer}>
                <Text style={styles.listTitle}>{item.list.title}</Text>
                <Text style={styles.listCount}>{item.list.count} albums</Text>
              </View>
            </View>
            
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.actionButton}>
                <Heart size={20} color={colors.textSecondary} />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={20} color={colors.textSecondary} />
                <Text style={styles.actionText}>{item.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
    
    return null;
  };

  return (
    <FlatList
      data={activityData}
      renderItem={renderActivityItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  nameContainer: {
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
    flex: 1,
  },
  listenedContent: {
    flex: 1,
  },
  listContent: {
    flex: 1,
  },
  albumInfo: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  albumThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  albumTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  albumTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  albumArtist: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginVertical: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  listInfo: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  listThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 12,
  },
  listTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  listTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  listCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
});