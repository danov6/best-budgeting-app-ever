import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/context/ThemeContext';
import BudgetScreen from './src/screens/BudgetScreen';
import AISuggestionsScreen from './src/screens/AISuggestionsScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('budget');
  const [sharedData, setSharedData] = useState({
    income: 5000,
    expenses: []
  });

  const updateSharedData = (newData) => {
    setSharedData(prev => ({ ...prev, ...newData }));
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'ai':
        return (
          <AISuggestionsScreen 
            income={sharedData.income}
            expenses={sharedData.expenses}
            onTabChange={setActiveTab}
          />
        );
      case 'goals':
        // Placeholder for future Goals screen
        return (
          <BudgetScreen 
            onTabChange={setActiveTab}
            sharedData={sharedData}
            updateSharedData={updateSharedData}
          />
        );
      case 'settings':
        // Placeholder for future Settings screen
        return (
          <BudgetScreen 
            onTabChange={setActiveTab}
            sharedData={sharedData}
            updateSharedData={updateSharedData}
          />
        );
      default:
        return (
          <BudgetScreen 
            onTabChange={setActiveTab}
            sharedData={sharedData}
            updateSharedData={updateSharedData}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <PaperProvider>
        <StatusBar style="auto" />
        {renderScreen()}
      </PaperProvider>
    </ThemeProvider>
  );
}
