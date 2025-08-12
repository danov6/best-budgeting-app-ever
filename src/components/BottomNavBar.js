import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const BottomNavBar = ({ activeTab = 'budget', onTabChange }) => {
  const { theme } = useTheme();

  const tabs = [
    { id: 'budget', name: 'Budget', icon: 'wallet' },
    { id: 'ai', name: 'AI Suggestions', icon: 'robot' },
    { id: 'goals', name: 'Goals', icon: 'target' },
    { id: 'settings', name: 'Settings', icon: 'cog' },
  ];

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingBottom: 20,
      paddingTop: 10,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 8,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tab: {
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      minWidth: 60,
    },
    activeTab: {
      backgroundColor: theme.primary + '20',
      borderRadius: 12,
    },
    tabText: {
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
    },
    activeTabText: {
      color: theme.primary,
      fontWeight: 'bold',
    },
    inactiveTabText: {
      color: theme.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onTabChange && onTabChange(tab.id)}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={24}
                color={isActive ? theme.primary : theme.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  isActive ? styles.activeTabText : styles.inactiveTabText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavBar;