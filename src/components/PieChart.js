import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useTheme } from '../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

const BudgetPieChart = ({ income, expenses }) => {
  const { theme } = useTheme();
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = Math.max(0, income - totalExpenses);
  
  const data = [
    {
      name: 'Remaining',
      amount: remaining,
      color: theme.success,
      legendFontColor: theme.text,
      legendFontSize: 15,
    },
    {
      name: 'Expenses',
      amount: totalExpenses,
      color: theme.primary,
      legendFontColor: theme.text,
      legendFontSize: 15,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: theme.background,
    backgroundGradientTo: theme.background,
    color: (opacity = 1) => theme.text,
    labelColor: (opacity = 1) => theme.text,
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: theme.text, 
        marginBottom: 10 
      }}>
        Monthly Budget Overview
      </Text>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: 15 
      }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: 'bold' }}>
            ${income.toFixed(2)}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Income
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: theme.primary, fontSize: 16, fontWeight: 'bold' }}>
            ${totalExpenses.toFixed(2)}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Expenses
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ 
            color: remaining >= 0 ? theme.success : theme.error, 
            fontSize: 16, 
            fontWeight: 'bold' 
          }}>
            ${remaining.toFixed(2)}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Remaining
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BudgetPieChart;