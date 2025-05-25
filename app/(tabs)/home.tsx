import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Settings } from 'lucide-react-native';

const HomeScreen = () => {
  const renderSection = (title: string, data: any[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.albumArt} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.artist && <Text style={styles.cardSubtitle}>{item.artist}</Text>}
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const trendingCrates = [
    { id: '1', title: 'Top 50 EDM Albums', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Every Grammy Nominated Album', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Standout Hip-Hop Artists', image: 'https://via.placeholder.com/150' },
  ];

  const friendsFavorites = [
    { id: '4', title: 'Pet Sounds', artist: 'by The Beach Boys', image: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Blonde on Blonde', artist: 'by Bob Dylan', image: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Rumours', artist: 'by Fleetwood Mac', image: 'https://via.placeholder.com/150' },
  ];

  const hiddenGems = [
    { id: '7', title: 'Dark Side of the Moon', artist: 'by Pink Floyd', image: 'https://via.placeholder.com/150' },
    { id: '8', title: 'Thriller', artist: 'by Michael Jackson', image: 'https://via.placeholder.com/150' },
  ];

  const communityDiscussions = [
    {
      id: '1',
      title: 'Who won the Kendrick and Drake Beef?',
      user: '@vinyllover',
      time: '2h',
      comments: '54 comments',
      image: 'https://via.placeholder.com/100x100'
    },
    {
      id: '2',
      title: 'What are your favorite underground Indie albums?',
      user: '@vinylholic',
      time: '1h',
      comments: '23 comments',
      image: 'https://via.placeholder.com/100x100'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}><Text style={{ color: '#FFC107' }}>CRATE</Text>DIG</Text>
        <Settings color="black" />
      </View>

      {renderSection('Trending Crates', trendingCrates)}
      {renderSection("Friends' Favorites", friendsFavorites)}
      {renderSection('Hidden Gems', hiddenGems)}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Community Discussion</Text>
        {communityDiscussions.map((post) => (
          <View key={post.id} style={styles.discussionCard}>
            <Image source={{ uri: post.image }} style={styles.avatar} />
            <View style={styles.discussionContent}>
              <Text style={styles.cardTitle}>{post.title}</Text>
              <Text style={styles.metaText}>Posted by {post.user} · {post.time}</Text>
              <Text style={styles.metaText}>{post.comments}</Text>
              <TouchableOpacity style={styles.viewPostButton}>
                <Text style={styles.viewPostText}>View Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  navbar: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111',
  },
  card: {
    marginRight: 12,
    width: 140,
  },
  albumArt: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  discussionCard: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  discussionContent: {
    flex: 1,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  viewPostButton: {
    marginTop: 4,
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  viewPostText: {
    fontSize: 12,
    color: '#000',
  }
});

export default HomeScreen;
