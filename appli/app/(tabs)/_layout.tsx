import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <MaterialIcons size={26} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="respiration"
        options={{
          title: 'Respirer',
          tabBarIcon: ({ color }) => <MaterialIcons size={26} name="air" color={color} />,
        }}
      />
      <Tabs.Screen
        name="diagnostic"
        options={{
          title: 'Stress',
          tabBarIcon: ({ color }) => <MaterialIcons size={26} name="assignment" color={color} />,
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ color }) => <MaterialIcons size={26} name="menu-book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <MaterialIcons size={26} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
