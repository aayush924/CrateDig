import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import OnboardingPagination from '@/components/OnboardingPagination';
import { colors } from '@/constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage] = useState(0);

  const handleGetStarted = () => {
    router.push('/onboarding/signup');
  };

  const handleSkip = () => {
    router.push('/onboarding/signup');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleSkip}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>CrateDig</Text>
        <Text style={styles.subtitle}>Discover Albums, Build Your Collection</Text>
        
        <OnboardingPagination currentPage={currentPage} totalPages={6} />
        
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    marginTop: 48,
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
});