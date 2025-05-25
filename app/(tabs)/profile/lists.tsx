import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors } from '@/constants/theme';
import { Plus } from 'lucide-react-native';

// Mock data for lists
const userLists = [
  {
    id: '1',
    title: 'Best Albums of 2024 So Far',
    description: 'My favorite releases from the first half of the year.',
    albumCount: 12,
    coverImages: [
      'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg',
      'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg',
      'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg',
    ],
  },
  {
    id: '2',
    title: 'Desert Island Discs',
    description: 'The albums I would take to a desert island.',
    albumCount: 8,
    coverImages: [
      'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg',
      'https://images.pexels.com/photos/1921168/pexels-photo-1921168.jpeg',
    ],
  },
  {
    id: '3',
    title: '90s Nostalgia',
    description: 'Albums that defined the decade.',
    albumCount: 15,
    coverImages: [
      'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg',
      'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg',
      'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg',
    ],
  },
];

export default function ListsScreen() {
  const [lists, setLists] = useState(userLists);
  
  const handleCreateList = () => {
    // Navigate to create list screen
    console.log('Create new list');
  };
  
  const handlePressItem = (listId: string) => {
    // Navigate to list detail
    console.log('View list:', listId);
  };
  
  const renderListItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={() => handlePressItem(item.id)}
    >
      <View style={styles.listCovers}>
        {item.coverImages.map((url: string, index: number) => (
          <Image 
            key={index} 
            source={{ uri: url }} 
            style={[
              styles.coverImage,
              { marginLeft: index > 0 ? -15 : 0, zIndex: 3 - index }
            ]} 
          />
        ))}
      </View>
      
      <View style={styles.listInfo}>
        <Text style={styles.listTitle}>{item.title}</Text>
        <Text style={styles.listDescription} numberOfLines={1}>{item.description}</Text>
        <Text style={styles.listCount}>{item.albumCount} albums</Text>
      </View>
    </TouchableOpacity>
  );
  
  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Lists Yet</Text>
      <Text style={styles.emptyText}>
        Create your first list to organize your music collection
      </Text>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
        <Text style={styles.createButtonText}>Create a List</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Lists</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleCreateList}>
          <Plus size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={lists}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={ListEmptyComponent}
      />
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listCovers: {
    flexDirection: 'row',
    marginRight: 16,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  listTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: colors.text,
    marginBottom: 4,
  },
  listDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  listCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 48,
  },
  emptyTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  createButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
});