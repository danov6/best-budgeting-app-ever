import React from "react";
import { View, ScrollView, StyleSheet, StatusBar, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import TopNavBar from "../components/TopNavBar";
import BottomNavBar from "../components/BottomNavBar";
import AISuggestions from "../components/AISuggestions";

const AISuggestionsScreen = ({ income = 5000, expenses = [], onTabChange }) => {
  const { theme, isDarkMode } = useTheme();

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
    headerSection: {
      alignItems: "center",
      padding: 30,
      marginTop: 20,
    },
    headerIcon: {
      marginBottom: 15,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
      marginBottom: 10,
    },
    headerSubtitle: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 22,
    },
    emptyState: {
      alignItems: "center",
      padding: 40,
      marginTop: 50,
    },
    emptyIcon: {
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
      marginBottom: 10,
      textAlign: "center",
    },
    emptyText: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: "center",
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.surface}
      />

      <TopNavBar title="AI Budget Assistant" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <MaterialCommunityIcons
            name="robot"
            size={48}
            color={theme.primary}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>AI Budget Analysis</Text>
          <Text style={styles.headerSubtitle}>
            Get personalized insights and recommendations to optimize your
            budget and achieve your financial goals.
          </Text>
        </View>

        <AISuggestions income={income} expenses={expenses} />

        {expenses.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="chart-line-variant"
              size={48}
              color={theme.textSecondary}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No Expenses Added Yet</Text>
            <Text style={styles.emptyText}>
              Add some expenses in the Budget tab to get more detailed AI
              recommendations and insights about your spending habits.
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNavBar activeTab="ai" onTabChange={onTabChange} />
    </View>
  );
};

export default AISuggestionsScreen;
