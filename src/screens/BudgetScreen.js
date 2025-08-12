import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet,
  StatusBar 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import TopNavBar from '../components/TopNavBar';
import BottomNavBar from '../components/BottomNavBar';
import IncomeInput from '../components/IncomeInput';
import ChartViewToggle from '../components/ChartViewToggle';
import BudgetChart from '../components/BudgetChart';
import ExpenseInput from '../components/ExpenseInput';
import ExpenseList from '../components/ExpenseList';
import SuggestionBubbles from '../components/SuggestionBubbles';

const BudgetScreen = ({ onTabChange, sharedData, updateSharedData }) => {
  const { theme, isDarkMode } = useTheme();
  const [chartView, setChartView] = useState('bar');
  
  const income = sharedData?.income || 5000;
  const expenses = sharedData?.expenses || [];

  const handleAddExpense = (expense) => {
    const newExpenses = [...expenses, expense];
    updateSharedData({ expenses: newExpenses });
  };

  const handleDeleteExpense = (expenseId) => {
    const newExpenses = expenses.filter(exp => exp.id !== expenseId);
    updateSharedData({ expenses: newExpenses });
  };

  const handleAddSuggestion = (suggestion) => {
    const newExpenses = [...expenses, suggestion];
    updateSharedData({ expenses: newExpenses });
  };

  const handleIncomeUpdate = (newIncome) => {
    updateSharedData({ income: newIncome });
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
    <View style={styles.container}>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.surface}
      />
      
      <TopNavBar />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <IncomeInput 
          income={income} 
          onUpdateIncome={handleIncomeUpdate} 
        />
        
        <ChartViewToggle 
          activeView={chartView}
          onViewChange={setChartView}
        />
        
        <BudgetChart 
          income={income} 
          expenses={expenses}
          viewType={chartView}
        />
        
        <ExpenseInput 
          onAddExpense={handleAddExpense} 
        />
        
        <SuggestionBubbles 
          expenses={expenses}
          onAddSuggestion={handleAddSuggestion}
        />
        
        <ExpenseList 
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </ScrollView>
      
      <BottomNavBar activeTab="budget" onTabChange={onTabChange} />
    </View>
  );
};

export default BudgetScreen;