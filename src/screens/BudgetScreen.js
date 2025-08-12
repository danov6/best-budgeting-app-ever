import React, { useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import IncomeInput from '../components/IncomeInput';
import BudgetPieChart from '../components/PieChart';
import ExpenseInput from '../components/ExpenseInput';
import ExpenseList from '../components/ExpenseList';
import SuggestionBubbles from '../components/SuggestionBubbles';
import AISuggestions from '../components/AISuggestions';

const BudgetScreen = () => {
  const { theme } = useTheme();
  const [income, setIncome] = useState(5000);
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
  };

  const handleAddSuggestion = (suggestion) => {
    // Add suggestion with default amount, user can edit later
    const expenseWithAmount = {
      ...suggestion,
      amount: 50 // Default amount for suggestions
    };
    setExpenses(prev => [...prev, expenseWithAmount]);
  };

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
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <IncomeInput 
          income={income} 
          onUpdateIncome={setIncome} 
        />
        
        <BudgetPieChart 
          income={income} 
          expenses={expenses} 
        />
        
        <ExpenseInput 
          onAddExpense={handleAddExpense} 
        />
        
        {expenses.length > 0 && (
          <SuggestionBubbles 
            expenses={expenses}
            onAddSuggestion={handleAddSuggestion}
          />
        )}
        
        <ExpenseList 
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
        
        {expenses.length > 0 && (
          <AISuggestions 
            income={income}
            expenses={expenses}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BudgetScreen;