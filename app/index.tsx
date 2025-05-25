import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

export default function Home() {
  // Redirect to the onboarding flow
  return <Redirect href="/onboarding" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});