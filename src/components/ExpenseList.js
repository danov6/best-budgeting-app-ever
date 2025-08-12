import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const { theme } = useTheme();

  const renderExpenseItem = ({ item }) => (
    <View style={[styles.expenseItem, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.expenseInfo}>
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color={theme.primary}
          style={styles.expenseIcon}
        />
        <View style={styles.expenseDetails}>
          <Text style={[styles.expenseName, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.expenseCategory, { color: theme.textSecondary }]}>
            {item.category}
          </Text>
        </View>
      </View>
      <View style={styles.expenseActions}>
        <Text style={[styles.expenseAmount, { color: theme.text }]}>
          ${item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => onDeleteExpense(item.id)}
          style={styles.deleteButton}
        >
          <MaterialCommunityIcons
            name="delete"
            size={20}
            color={theme.error}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      margin: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
    },
    expenseItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      borderWidth: 1,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    expenseInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    expenseIcon: {
      marginRight: 12,
    },
    expenseDetails: {
      flex: 1,
    },
    expenseName: {
      fontSize: 16,
      fontWeight: '600',
    },
    expenseCategory: {
      fontSize: 12,
      textTransform: 'capitalize',
      marginTop: 2,
    },
    expenseActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    expenseAmount: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
    },
    deleteButton: {
      padding: 5,
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyText: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: 'center',
      marginTop: 10,
    },
  });

  if (expenses.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Expenses</Text>
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="wallet-outline"
            size={48}
            color={theme.textSecondary}
          />
          <Text style={styles.emptyText}>
            No expenses added yet.{'\n'}Start by adding your first expense above!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expenses</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderExpenseItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseList;