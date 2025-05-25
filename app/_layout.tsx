import { useEffect } from 'react';
import { Tabs, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  Poppins_400Regular as PoppinsRegular,
  Poppins_500Medium as PoppinsMedium,
  Poppins_600SemiBold as PoppinsSemiBold,
  Poppins_700Bold as PoppinsBold
} from '@expo-google-fonts/poppins';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': PoppinsRegular,
    'Poppins-Medium': PoppinsMedium,
    'Poppins-SemiBold': PoppinsSemiBold,
    'Poppins-Bold': PoppinsBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}