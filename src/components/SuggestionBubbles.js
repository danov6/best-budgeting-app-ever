import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { expenseCategories, categoryRelatedExpenses } from '../data/expenseCategories';

const SuggestionBubbles = ({ expenses, onAddSuggestion }) => {
  const { theme } = useTheme();

  const getSuggestions = () => {
    const existingExpenseNames = expenses.map(exp => exp.name.toLowerCase());
    const suggestions = new Set();

    expenses.forEach(expense => {
      const expenseKey = Object.keys(expenseCategories).find(key => 
        expenseCategories[key].name.toLowerCase() === expense.name.toLowerCase()
      );
      
      if (expenseKey && categoryRelatedExpenses[expenseKey]) {
        categoryRelatedExpenses[expenseKey].forEach(relatedKey => {
          const relatedExpense = expenseCategories[relatedKey];
          if (relatedExpense && !existingExpenseNames.includes(relatedExpense.name.toLowerCase())) {
            suggestions.add(relatedKey);
          }
        });
      }
    });

    return Array.from(suggestions).slice(0, 6);
  };

  const suggestions = getSuggestions();

  if (suggestions.length === 0) {
    return null;
  }

  const handleSuggestionPress = (suggestionKey) => {
    const suggestion = expenseCategories[suggestionKey];
    onAddSuggestion({
      id: Date.now().toString(),
      name: suggestion.name,
      amount: 0,
      icon: suggestion.icon,
      category: suggestion.category
    });
  };

  const styles = StyleSheet.create({
    container: {
      margin: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 15,
    },
    scrollContainer: {
      paddingVertical: 5,
    },
    suggestionBubble: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    suggestionIcon: {
      marginRight: 8,
    },
    suggestionText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: '500',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Expenses</Text>
      <Text style={styles.subtitle}>
        Based on your current expenses, you might also need:
      </Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {suggestions.map((suggestionKey) => {
          const suggestion = expenseCategories[suggestionKey];
          return (
            <TouchableOpacity
              key={suggestionKey}
              style={styles.suggestionBubble}
              onPress={() => handleSuggestionPress(suggestionKey)}
            >
              <MaterialCommunityIcons
                name={suggestion.icon}
                size={18}
                color={theme.secondary}
                style={styles.suggestionIcon}
              />
              <Text style={styles.suggestionText}>
                {suggestion.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SuggestionBubbles;