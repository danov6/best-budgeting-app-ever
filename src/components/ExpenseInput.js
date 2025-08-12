import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { expenseCategories } from '../data/expenseCategories';

const ExpenseInput = ({ onAddExpense }) => {
  const { theme } = useTheme();
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (expenseName.length > 1) {
      const filtered = Object.keys(expenseCategories).filter(key =>
        key.toLowerCase().includes(expenseName.toLowerCase()) ||
        expenseCategories[key].name.toLowerCase().includes(expenseName.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [expenseName]);

  const handleAddExpense = () => {
    if (expenseName && expenseAmount) {
      const amount = parseFloat(expenseAmount);
      if (!isNaN(amount)) {
        const category = expenseCategories[expenseName.toLowerCase()] || {
          name: expenseName,
          icon: 'cash',
          category: 'other'
        };
        
        onAddExpense({
          id: Date.now().toString(),
          name: category.name,
          amount: amount,
          icon: category.icon,
          category: category.category
        });
        
        setExpenseName('');
        setExpenseAmount('');
        setShowSuggestions(false);
      }
    }
  };

  const selectSuggestion = (key) => {
    setExpenseName(expenseCategories[key].name);
    setShowSuggestions(false);
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
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.background,
    },
    addButton: {
      backgroundColor: theme.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      backgroundColor: theme.background,
    },
    suggestionText: {
      marginLeft: 10,
      fontSize: 16,
      color: theme.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Expense</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Expense Name</Text>
        <TextInput
          style={styles.input}
          value={expenseName}
          onChangeText={setExpenseName}
          placeholder="e.g., Rent, Groceries, Car Insurance"
          placeholderTextColor={theme.textSecondary}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => selectSuggestion(item)}
              >
                <MaterialCommunityIcons
                  name={expenseCategories[item].icon}
                  size={24}
                  color={theme.primary}
                />
                <Text style={styles.suggestionText}>
                  {expenseCategories[item].name}
                </Text>
              </TouchableOpacity>
            )}
            style={{
              maxHeight: 200,
              borderWidth: 1,
              borderColor: theme.border,
              borderRadius: 8,
              marginTop: 5,
            }}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount ($)</Text>
        <TextInput
          style={styles.input}
          value={expenseAmount}
          onChangeText={setExpenseAmount}
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
        <Text style={styles.addButtonText}>Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseInput;