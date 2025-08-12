import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ChartViewToggle = ({ activeView, onViewChange }) => {
  const { theme } = useTheme();

  const views = [
    { id: 'bar', name: 'Budget Bar', icon: 'chart-bar' },
    { id: 'pie', name: 'Expense Pie', icon: 'chart-pie' },
  ];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 4,
      margin: 20,
      marginBottom: 10,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    toggleButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    activeButton: {
      backgroundColor: theme.primary,
    },
    inactiveButton: {
      backgroundColor: 'transparent',
    },
    buttonIcon: {
      marginRight: 6,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
    },
    activeButtonText: {
      color: 'white',
    },
    inactiveButtonText: {
      color: theme.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      {views.map((view) => {
        const isActive = view.id === activeView;
        return (
          <TouchableOpacity
            key={view.id}
            style={[
              styles.toggleButton,
              isActive ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={() => onViewChange(view.id)}
          >
            <MaterialCommunityIcons
              name={view.icon}
              size={18}
              color={isActive ? 'white' : theme.textSecondary}
              style={styles.buttonIcon}
            />
            <Text
              style={[
                styles.buttonText,
                isActive ? styles.activeButtonText : styles.inactiveButtonText,
              ]}
            >
              {view.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ChartViewToggle;