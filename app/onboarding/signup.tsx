import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import OnboardingPagination from '@/components/OnboardingPagination';
import { colors } from '@/constants/theme';

export default function SignupScreen() {
  const router = useRouter();
  
  const handleContinueWithEmail = () => {
    router.push('/onboarding/email');
  };
  
  const handleGoogleSignup = () => {
    // Would implement Google OAuth here
    router.push('/onboarding/genres');
  };
  
  const handleAppleSignup = () => {
    // Would implement Apple OAuth here
    router.push('/onboarding/genres');
  };
  
  const handleSkip = () => {
    router.push('/onboarding/genres');
  };
  
  const handleClose = () => {
    router.push('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Start your collection</Text>
        <Text style={styles.subtitle}>
          Join CrateDig to track your favorites and unlock personalized recommendations
        </Text>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleContinueWithEmail}>
            <Text style={styles.primaryButtonText}>Continue with email</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleGoogleSignup}>
            <Text style={styles.secondaryButtonText}>Sign up with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleAppleSignup}>
            <Text style={styles.secondaryButtonText}>Sign up with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.textButton} onPress={handleSkip}>
            <Text style={styles.textButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.disclaimer}>
          We may use your data for personalized ads. You can change your privacy settings at any time in the Settings app.
        </Text>
        
        <OnboardingPagination currentPage={1} totalPages={6} />
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
    fontSize: 24,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  textButton: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  textButtonText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text,
  },
  disclaimer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
  },
});