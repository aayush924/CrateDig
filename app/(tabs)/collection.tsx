import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Header from '@/components/Header';
import AlbumGrid from '@/components/AlbumGrid';
import { colors } from '@/constants/theme';

export default function CollectionScreen() {
  const [activeTab, setActiveTab] = useState('albums');

  return (
    <View style={styles.container}>
      <Header title="My Collection" />
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'albums' && styles.activeTab]}
          onPress={() => setActiveTab('albums')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'albums' && styles.activeTabText,
            ]}
          >
            Albums
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lists' && styles.activeTab]}
          onPress={() => setActiveTab('lists')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'lists' && styles.activeTabText,
            ]}
          >
            Lists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
          onPress={() => setActiveTab('reviews')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'reviews' && styles.activeTabText,
            ]}
          >
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {activeTab === 'albums' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recently Added</Text>
              <AlbumGrid type="collection" />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Favorites</Text>
              <AlbumGrid type="favorites" />
            </View>
          </>
        )}
        {activeTab === 'lists' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Lists Yet</Text>
            <Text style={styles.emptyStateText}>
              Create your first list to organize your music collection
            </Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create a List</Text>
            </TouchableOpacity>
          </View>
        )}
        {activeTab === 'reviews' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Reviews Yet</Text>
            <Text style={styles.emptyStateText}>
              Start reviewing albums to build your collection
            </Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Write a Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  scrollView: {
    flex: 1,
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
    marginTop: 16,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 48,
  },
  emptyStateTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.text,
    marginBottom: 8,
  },
  emptyStateText: {
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