import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { Header } from '@/src/components/Header';
import { Colors } from '@/src/constants/colors';
import { Typography } from '@/src/constants/typography';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tab.active,
        tabBarInactiveTintColor: Colors.tab.inactive,
        tabBarStyle: {
          backgroundColor: Colors.tab.background,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: Typography.tab.fontSize,
          fontWeight: Typography.tab.fontWeight,
        },
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          header: () => <Header title="Tech Blog Posts" />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '북마크',
          header: () => <Header title="북마크" />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
