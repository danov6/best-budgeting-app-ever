import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  StatusBar 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import TopNavBar from '../components/TopNavBar';
import BottomNavBar from '../components/BottomNavBar';

const SettingsScreen = ({ onTabChange }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const currencies = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸', symbol: '$' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', symbol: '€' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺', symbol: 'A$' },
    { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿', symbol: 'NZ$' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      paddingBottom: 20,
    },
    sectionContainer: {
      backgroundColor: theme.surface,
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 12,
      padding: 20,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
    },
    sectionDescription: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 20,
      lineHeight: 20,
    },
    optionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 8,
      marginBottom: 8,
    },
    selectedOption: {
      backgroundColor: theme.primary + '20',
      borderWidth: 2,
      borderColor: theme.primary,
    },
    unselectedOption: {
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.border,
    },
    flagText: {
      fontSize: 24,
      marginRight: 12,
    },
    optionTextContainer: {
      flex: 1,
    },
    optionName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    optionSubtext: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    checkIcon: {
      marginLeft: 10,
    },
    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: theme.background,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    toggleLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    toggleIcon: {
      marginRight: 12,
    },
    toggleTextContainer: {
      flex: 1,
    },
    toggleTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    toggleSubtitle: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    toggleButton: {
      width: 50,
      height: 30,
      borderRadius: 15,
      padding: 2,
      justifyContent: 'center',
    },
    toggleButtonActive: {
      backgroundColor: theme.primary,
      alignItems: 'flex-end',
    },
    toggleButtonInactive: {
      backgroundColor: theme.border,
      alignItems: 'flex-start',
    },
    toggleCircle: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: 'white',
    },
  });

  const renderCurrencyOption = (currency) => {
    const isSelected = selectedCurrency === currency.code;
    return (
      <TouchableOpacity
        key={currency.code}
        style={[
          styles.optionItem,
          isSelected ? styles.selectedOption : styles.unselectedOption,
        ]}
        onPress={() => setSelectedCurrency(currency.code)}
      >
        <Text style={styles.flagText}>{currency.flag}</Text>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionName}>{currency.name}</Text>
          <Text style={styles.optionSubtext}>
            {currency.code} • {currency.symbol}
          </Text>
        </View>
        {isSelected && (
          <MaterialCommunityIcons
            name="check-circle"
            size={20}
            color={theme.primary}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderLanguageOption = (language) => {
    const isSelected = selectedLanguage === language.name;
    return (
      <TouchableOpacity
        key={language.code}
        style={[
          styles.optionItem,
          isSelected ? styles.selectedOption : styles.unselectedOption,
        ]}
        onPress={() => setSelectedLanguage(language.name)}
      >
        <Text style={styles.flagText}>{language.flag}</Text>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionName}>{language.name}</Text>
          <Text style={styles.optionSubtext}>{language.code.toUpperCase()}</Text>
        </View>
        {isSelected && (
          <MaterialCommunityIcons
            name="check-circle"
            size={20}
            color={theme.primary}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.surface}
      />
      
      <TopNavBar title="Settings" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Currency Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Currency</Text>
          <Text style={styles.sectionDescription}>
            Choose your preferred currency for displaying amounts throughout the app.
          </Text>
          {currencies.map(renderCurrencyOption)}
        </View>

        {/* Language Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Language</Text>
          <Text style={styles.sectionDescription}>
            Select your preferred language for the app interface.
          </Text>
          {languages.map(renderLanguageOption)}
        </View>

        {/* Theme Toggle */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <Text style={styles.sectionDescription}>
            Customize the look and feel of your app.
          </Text>
          
          <TouchableOpacity style={styles.toggleContainer} onPress={toggleTheme}>
            <View style={styles.toggleLeft}>
              <MaterialCommunityIcons
                name={isDarkMode ? "weather-night" : "weather-sunny"}
                size={24}
                color={theme.primary}
                style={styles.toggleIcon}
              />
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Text style={styles.toggleSubtitle}>
                  {isDarkMode 
                    ? 'Switch to light theme' 
                    : 'Switch to dark theme'
                  }
                </Text>
              </View>
            </View>
            
            <View style={[
              styles.toggleButton,
              isDarkMode ? styles.toggleButtonActive : styles.toggleButtonInactive
            ]}>
              <View style={styles.toggleCircle} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <BottomNavBar activeTab="settings" onTabChange={onTabChange} />
    </View>
  );
};

export default SettingsScreen;