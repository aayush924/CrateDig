import React from 'react';
import { Tabs } from 'expo-router';
import { Headphones, Chrome as Home, Search, User, CirclePlus as PlusCircle } from 'lucide-react-native';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          paddingBottom: 8,
          height: 60,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          marginTop: -4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Log',
          tabBarIcon: ({ color, size }) => <PlusCircle size={size + 4} color={color} />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ color, size }) => <Headphones size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      
      {/* Hidden screens that are part of the tab navigator but not shown in the tab bar */}
      <Tabs.Screen
        name="album/[id]"
        options={{
          href: null,
          headerShown: true,
          headerTitle: 'Album Details',
        }}
      />
      <Tabs.Screen
        name="profile/lists"
        options={{
          href: null,
          headerShown: true,
          headerTitle: 'My Lists',
        }}
      />
      <Tabs.Screen
        name="profile/stats"
        options={{
          href: null,
          headerShown: true,
          headerTitle: 'My Stats',
        }}
      />
    </Tabs>
  );
}