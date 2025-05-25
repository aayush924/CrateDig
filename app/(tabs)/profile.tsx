import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Settings, Users, BarChart3 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>sushiroll22</Text>
            <Text style={styles.bio}>
              Music enthusiast. Exploring new sounds and old classics.
            </Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>237</Text>
                <Text style={styles.statLabel}>Albums</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>42</Text>
                <Text style={styles.statLabel}>Lists</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>153</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>86</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Users size={20} color={colors.text} />
            <Text style={styles.actionButtonText}>Find Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <BarChart3 size={20} color={colors.text} />
            <Text style={styles.actionButtonText}>Stats</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recently Listened</Text>
          {/* Album grid would go here */}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Albums of 2025</Text>
          {/* Album grid would go here */}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {/* Reviews would go here */}
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
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsButton: {
    padding: 8,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: colors.text,
    marginBottom: 8,
  },
  bio: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 32,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.text,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
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