import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const TopNavBar = ({ title = "Best Budgeting App" }) => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuButton: {
      padding: 5,
      marginRight: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeButton: {
      padding: 5,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={theme.primary}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
            <MaterialCommunityIcons
              name={isDarkMode ? "weather-sunny" : "weather-night"}
              size={24}
              color={theme.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopNavBar;