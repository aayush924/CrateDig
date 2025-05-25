import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import OnboardingPagination from '@/components/OnboardingPagination';
import { colors } from '@/constants/theme';

export default function UsernameScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  
  const handleContinue = () => {
    // Complete the onboarding process
    router.push('/(tabs)/home');
  };
  
  const handleClose = () => {
    router.push('/(tabs)/home');
  };

  const isValidUsername = username.length >= 4;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Your username is how friends add you</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !isValidUsername && styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={!isValidUsername}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        
        <OnboardingPagination currentPage={4} totalPages={6} />
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
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 32,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  continueButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.buttonText,
  },
});