import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const AISuggestions = ({ income, expenses }) => {
  const { theme } = useTheme();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSuggestions = () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      const remaining = income - totalExpenses;
      const suggestions = [];

      // If no expenses, provide general budgeting advice
      if (expenses.length === 0) {
        suggestions.push({
          type: 'opportunity',
          title: 'Start Your Budget Journey',
          message: `With a monthly income of $${income.toFixed(2)}, you have great potential! Start by tracking your essential expenses like rent, utilities, and groceries.`,
          icon: 'rocket-launch'
        });
        suggestions.push({
          type: 'tip',
          title: '50/30/20 Rule',
          message: 'Try the 50/30/20 budgeting rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.',
          icon: 'chart-pie'
        });
        suggestions.push({
          type: 'alternative',
          title: 'Emergency Fund',
          message: 'Aim to save 3-6 months of expenses in an emergency fund. Start with just $50-100 per month.',
          icon: 'shield-check'
        });
      }

      // Budget analysis suggestions
      if (remaining < 0) {
        suggestions.push({
          type: 'warning',
          title: 'Budget Deficit',
          message: `You're overspending by $${Math.abs(remaining).toFixed(2)}. Consider reducing discretionary expenses.`,
          icon: 'alert-circle'
        });
      } else if (remaining < income * 0.1) {
        suggestions.push({
          type: 'caution',
          title: 'Low Savings Rate',
          message: `Only $${remaining.toFixed(2)} left for savings. Aim for 20% of income.`,
          icon: 'piggy-bank'
        });
      }

      // Specific expense suggestions
      const gymExpense = expenses.find(exp => exp.name.toLowerCase().includes('gym'));
      if (gymExpense && gymExpense.amount > 100) {
        suggestions.push({
          type: 'alternative',
          title: 'Gym Alternative',
          message: `Consider Planet Fitness ($10/month) instead of your current $${gymExpense.amount}/month gym.`,
          icon: 'dumbbell',
          savings: gymExpense.amount - 10
        });
      }

      const eatingOut = expenses.find(exp => exp.name.toLowerCase().includes('eating out'));
      if (eatingOut && eatingOut.amount > 200) {
        suggestions.push({
          type: 'tip',
          title: 'Meal Planning',
          message: `Reduce eating out by meal prepping. Could save $${(eatingOut.amount * 0.3).toFixed(2)}/month.`,
          icon: 'food',
          savings: eatingOut.amount * 0.3
        });
      }

      // Savings suggestions
      if (remaining > income * 0.2) {
        suggestions.push({
          type: 'opportunity',
          title: 'Investment Opportunity',
          message: `Great job! You have $${remaining.toFixed(2)} extra. Consider investing in an index fund.`,
          icon: 'trending-up'
        });
      }

      setSuggestions(suggestions);
      setIsLoading(false);
    }, 1500);
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'warning': return theme.error;
      case 'caution': return theme.warning;
      case 'alternative': return theme.primary;
      case 'tip': return theme.secondary;
      case 'opportunity': return theme.success;
      default: return theme.primary;
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      padding: 20,
      borderRadius: 12,
      margin: 20,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
    },
    analyzeButton: {
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    analyzeButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 8,
    },
    suggestionItem: {
      flexDirection: 'row',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      borderLeftWidth: 4,
    },
    suggestionIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    suggestionContent: {
      flex: 1,
    },
    suggestionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    suggestionMessage: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 20,
    },
    savingsText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.success,
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="robot"
          size={24}
          color={theme.primary}
        />
        <Text style={styles.title}>AI Budget Analysis</Text>
      </View>

      {suggestions.length === 0 ? (
        <TouchableOpacity 
          style={styles.analyzeButton} 
          onPress={generateSuggestions}
          disabled={isLoading}
        >
          <MaterialCommunityIcons
            name={isLoading ? "loading" : "brain"}
            size={20}
            color="white"
          />
          <Text style={styles.analyzeButtonText}>
            {isLoading ? 'Analyzing...' : 'Analyze My Budget'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          {suggestions.map((suggestion, index) => (
            <View
              key={index}
              style={[
                styles.suggestionItem,
                { 
                  backgroundColor: theme.background,
                  borderLeftColor: getSuggestionColor(suggestion.type)
                }
              ]}
            >
              <MaterialCommunityIcons
                name={suggestion.icon}
                size={24}
                color={getSuggestionColor(suggestion.type)}
                style={styles.suggestionIcon}
              />
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>
                  {suggestion.title}
                </Text>
                <Text style={styles.suggestionMessage}>
                  {suggestion.message}
                </Text>
                {suggestion.savings && (
                  <Text style={styles.savingsText}>
                    Potential savings: ${suggestion.savings.toFixed(2)}/month
                  </Text>
                )}
              </View>
            </View>
          ))}
          <TouchableOpacity 
            style={[styles.analyzeButton, { backgroundColor: theme.secondary }]} 
            onPress={generateSuggestions}
            disabled={isLoading}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={20}
              color="white"
            />
            <Text style={styles.analyzeButtonText}>
              Re-analyze Budget
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AISuggestions;