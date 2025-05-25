import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { User, UserPlus } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface UserItem {
  id: string;
  username: string;
  avatar: string;
  bio?: string;
  isFollowing?: boolean;
}

interface UserListProps {
  users: UserItem[];
  onPressUser: (userId: string) => void;
  onFollowUser?: (userId: string) => void;
  showFollowButton?: boolean;
  title?: string;
}

export default function UserList({
  users,
  onPressUser,
  onFollowUser,
  showFollowButton = false,
  title
}: UserListProps) {
  const renderUserItem = ({ item }: { item: UserItem }) => (
    <TouchableOpacity 
      style={styles.userContainer}
      onPress={() => onPressUser(item.id)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        {item.bio && <Text style={styles.bio} numberOfLines={1}>{item.bio}</Text>}
      </View>
      
      {showFollowButton && (
        <TouchableOpacity 
          style={[
            styles.followButton,
            item.isFollowing ? styles.followingButton : null
          ]}
          onPress={() => onFollowUser?.(item.id)}
        >
          {item.isFollowing ? (
            <User size={16} color={colors.text} />
          ) : (
            <UserPlus size={16} color={colors.buttonText} />
          )}
          <Text 
            style={[
              styles.followButtonText,
              item.isFollowing ? styles.followingButtonText : null
            ]}
          >
            {item.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.text,
  },
  bio: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  followingButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.buttonText,
    marginLeft: 4,
  },
  followingButtonText: {
    color: colors.text,
  },
});