import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const TakeHomeSummary = ({ income, expenses }) => {
  const { theme } = useTheme();
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const takeHomePay = income - totalExpenses;
  const isPositive = takeHomePay >= 0;
  const percentageRemaining = income > 0 ? (takeHomePay / income) * 100 : 0;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: 5,
      borderRadius: 16,
      padding: 20,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 4,
      borderLeftColor: isPositive ? theme.success : theme.error,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    headerIcon: {
      marginRight: 8,
    },
    headerText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'space-between',
    },
    mainAmount: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isPositive ? theme.success : theme.error,
    },
    percentageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    percentageText: {
      fontSize: 16,
      fontWeight: '600',
      color: isPositive ? theme.success : theme.error,
      marginLeft: 4,
    },
    breakdownContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    breakdownItem: {
      alignItems: 'center',
      flex: 1,
    },
    breakdownAmount: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    breakdownLabel: {
      fontSize: 11,
      color: theme.textSecondary,
      marginTop: 2,
      textAlign: 'center',
    },
    statusMessage: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 8,
      textAlign: 'center',
      fontStyle: 'italic',
    },
  });

  const getStatusMessage = () => {
    if (takeHomePay < 0) {
      return "You're overspending your budget";
    } else if (percentageRemaining < 10) {
      return "Consider increasing your savings rate";
    } else if (percentageRemaining > 50) {
      return "Great job! You have room for savings or investments";
    } else {
      return "You're on track with your budget";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={isPositive ? "trending-up" : "trending-down"}
          size={18}
          color={isPositive ? theme.success : theme.error}
          style={styles.headerIcon}
        />
        <Text style={styles.headerText}>Take-Home After Expenses</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.mainAmount}>
          ${Math.abs(takeHomePay).toFixed(2)}
        </Text>
        <View style={styles.percentageContainer}>
          <MaterialCommunityIcons
            name={isPositive ? "arrow-up" : "arrow-down"}
            size={16}
            color={isPositive ? theme.success : theme.error}
          />
          <Text style={styles.percentageText}>
            {Math.abs(percentageRemaining).toFixed(1)}%
          </Text>
        </View>
      </View>

      <View style={styles.breakdownContainer}>
        <View style={styles.breakdownItem}>
          <Text style={styles.breakdownAmount}>
            ${income.toFixed(2)}
          </Text>
          <Text style={styles.breakdownLabel}>Monthly Income</Text>
        </View>
        
        <View style={styles.breakdownItem}>
          <Text style={[styles.breakdownAmount, { color: theme.primary }]}>
            ${totalExpenses.toFixed(2)}
          </Text>
          <Text style={styles.breakdownLabel}>Total Expenses</Text>
        </View>
        
        <View style={styles.breakdownItem}>
          <Text style={[styles.breakdownAmount, { color: expenses.length }]}>
            {expenses.length}
          </Text>
          <Text style={styles.breakdownLabel}>
            Expense{expenses.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      <Text style={styles.statusMessage}>
        {getStatusMessage()}
      </Text>
    </View>
  );
};

export default TakeHomeSummary;