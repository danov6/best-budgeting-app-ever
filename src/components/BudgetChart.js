import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "../context/ThemeContext";

const screenWidth = Dimensions.get("window").width;

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

  const renderBarChart = () => (
    <View
      style={{
        alignItems: "center",
        marginVertical: 20,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
        }}
      >
        Monthly Budget Overview
      </Text>

      {/* Progress Bar Style Chart */}
      <View
        style={{
          width: screenWidth - 40,
          height: 40,
          backgroundColor: theme.surface,
          borderRadius: 20,
          flexDirection: "row",
          overflow: "hidden",
          marginBottom: 20,
          borderWidth: 2,
          borderColor: theme.border,
        }}
      >
        <View
          style={{
            width: `${Math.min(expensePercentage, 100)}%`,
            backgroundColor: theme.primary,
            height: "100%",
          }}
        />
        <View
          style={{
            width: `${Math.min(remainingPercentage, 100)}%`,
            backgroundColor: theme.success,
            height: "100%",
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
          marginTop: 15,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: "bold" }}>
            ${income.toFixed(2)}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Income
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ color: theme.primary, fontSize: 16, fontWeight: "bold" }}
          >
            ${totalExpenses.toFixed(2)}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Expenses ({expensePercentage.toFixed(1)}%)
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: remaining >= 0 ? theme.success : theme.error,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            ${remaining.toFixed(2)}
          </Text>
          <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
            Remaining ({remainingPercentage.toFixed(1)}%)
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPieChart = () => {
    const expenseData = getExpensesByCategory();

    if (expenses.length === 0) {
      return (
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: theme.text,
              marginBottom: 20,
            }}
          >
            Expense Breakdown
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: theme.textSecondary,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Add some expenses to see your breakdown
          </Text>
        </View>
      );
    }

    return (
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: theme.text,
            marginBottom: 20,
          }}
        >
          Expense Breakdown
        </Text>

        <PieChart
          data={expenseData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        <View
          style={{
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{ color: theme.primary, fontSize: 16, fontWeight: "bold" }}
          >
            Total Expenses: ${totalExpenses.toFixed(2)}
          </Text>
          <Text
            style={{ color: theme.textSecondary, fontSize: 12, marginTop: 5 }}
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
