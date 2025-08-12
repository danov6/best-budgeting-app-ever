import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "../context/ThemeContext";

const BudgetChart = ({ income, expenses, viewType = "bar" }) => {
  const { theme } = useTheme();

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const remaining = Math.max(0, income - totalExpenses);

  const expensePercentage = income > 0 ? (totalExpenses / income) * 100 : 0;
  const remainingPercentage = income > 0 ? (remaining / income) * 100 : 0;

  // Group expenses by category for pie chart
  const getExpensesByCategory = () => {
    const categoryTotals = {};
    expenses.forEach((expense) => {
      const category = expense.category || "other";
      categoryTotals[category] =
        (categoryTotals[category] || 0) + expense.amount;
    });

    return Object.entries(categoryTotals).map(([category, amount], index) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      amount: amount,
      color: getColorForCategory(category, index),
      legendFontColor: theme.text,
      legendFontSize: 12,
    }));
  };

  const getColorForCategory = (category, index) => {
    const colors = [
      theme.primary,
      theme.secondary,
      theme.chart?.tertiary || "#8b5cf6",
      theme.chart?.quaternary || "#f59e0b",
      theme.chart?.quinary || "#ef4444",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#ec4899",
      "#6366f1",
    ];
    return colors[index % colors.length];
  };

  const chartConfig = {
    backgroundGradientFrom: theme.background,
    backgroundGradientTo: theme.background,
    color: (opacity = 1) => theme.text,
    labelColor: (opacity = 1) => theme.text,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginVertical: 20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },
    progressBarContainer: {
      width: "100%",
      height: 40,
      backgroundColor: theme.surface,
      borderRadius: 20,
      flexDirection: "row",
      overflow: "hidden",
      marginBottom: 20,
      borderWidth: 2,
      borderColor: theme.border,
    },
    expenseBar: {
      backgroundColor: theme.primary,
      height: "100%",
    },
    remainingBar: {
      backgroundColor: theme.success,
      height: "100%",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: 15,
    },
    statItem: {
      alignItems: "center",
      flex: 1,
    },
    statAmount: {
      fontSize: 16,
      fontWeight: "bold",
    },
    statLabel: {
      fontSize: 12,
      marginTop: 2,
      textAlign: "center",
    },
    emptyState: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      marginTop: 40,
    },
  });

  const renderBarChart = () => {
    // Fix percentage calculation to ensure they don't exceed 100%
    const safeExpensePercentage = Math.min(expensePercentage, 100);
    const safeRemainingPercentage = Math.max(
      0,
      Math.min(remainingPercentage, 100 - safeExpensePercentage)
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Monthly Budget Overview</Text>

        {/* Responsive Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.expenseBar, { width: `${safeExpensePercentage}%` }]}
          />
          <View
            style={[
              styles.remainingBar,
              { width: `${safeRemainingPercentage}%` },
            ]}
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statAmount, { color: theme.text }]}>
              ${income.toFixed(2)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Income
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statAmount, { color: theme.primary }]}>
              ${totalExpenses.toFixed(2)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Expenses ({expensePercentage.toFixed(1)}%)
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statAmount,
                { color: remaining >= 0 ? theme.success : theme.error },
              ]}
            >
              ${remaining.toFixed(2)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Remaining ({remainingPercentage.toFixed(1)}%)
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPieChart = () => {
    const expenseData = getExpensesByCategory();

    if (expenses.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Expense Breakdown</Text>
          <Text style={styles.emptyState}>
            Add some expenses to see your breakdown
          </Text>
        </View>
      );
    }

    // Get screen dimensions dynamically for responsive chart
    const screenWidth = Dimensions.get("window").width;
    const chartWidth = Math.min(screenWidth - 40, 350); // Max width of 350

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Expense Breakdown</Text>

        <PieChart
          data={expenseData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <View style={{ alignItems: "center", marginTop: 15 }}>
          <Text style={[styles.statAmount, { color: theme.primary }]}>
            Total Expenses: ${totalExpenses.toFixed(2)}
          </Text>
          <Text
            style={[
              styles.statLabel,
              { color: theme.textSecondary, marginTop: 5 },
            ]}
          >
            {expenses.length} expense{expenses.length !== 1 ? "s" : ""} across{" "}
            {expenseData.length} categor{expenseData.length !== 1 ? "ies" : "y"}
          </Text>
        </View>
      </View>
    );
  };

  return viewType === "pie" ? renderPieChart() : renderBarChart();
};

export default BudgetChart;
