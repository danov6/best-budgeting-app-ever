import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import {
  expenseCategories,
  categoryRelatedExpenses,
} from "../data/expenseCategories";
import AddExpenseModal from "./AddExpenseModal";

const SuggestionBubbles = ({ expenses, onAddSuggestion }) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const getSuggestions = () => {
    const existingExpenseNames = expenses.map((exp) => exp.name.toLowerCase());
    const suggestions = new Set();

    // Get related suggestions based on existing expenses
    expenses.forEach((expense) => {
      const expenseKey = Object.keys(expenseCategories).find(
        (key) =>
          expenseCategories[key].name.toLowerCase() ===
          expense.name.toLowerCase()
      );

      if (expenseKey && categoryRelatedExpenses[expenseKey]) {
        categoryRelatedExpenses[expenseKey].forEach((relatedKey) => {
          const relatedExpense = expenseCategories[relatedKey];
          if (
            relatedExpense &&
            !existingExpenseNames.includes(relatedExpense.name.toLowerCase())
          ) {
            suggestions.add(relatedKey);
          }
        });
      }
    });

    // If we don't have enough suggestions, add some common ones
    const commonSuggestions = [
      "groceries",
      "utilities",
      "gas",
      "netflix",
      "coffee",
      "phone bill",
    ];
    commonSuggestions.forEach((key) => {
      if (
        suggestions.size < 6 &&
        !existingExpenseNames.includes(
          expenseCategories[key]?.name.toLowerCase()
        )
      ) {
        suggestions.add(key);
      }
    });

    // Ensure we always have at least 3 suggestions
    const allKeys = Object.keys(expenseCategories);
    for (let i = 0; i < allKeys.length && suggestions.size < 3; i++) {
      const key = allKeys[i];
      if (
        !existingExpenseNames.includes(
          expenseCategories[key].name.toLowerCase()
        )
      ) {
        suggestions.add(key);
      }
    }

    return Array.from(suggestions).slice(0, 6);
  };

  const suggestions = getSuggestions();

  const handleSuggestionPress = (suggestionKey) => {
    const suggestion = expenseCategories[suggestionKey];
    setSelectedExpense({
      name: suggestion.name,
      icon: suggestion.icon,
      category: suggestion.category,
    });
    setModalVisible(true);
  };

  const handleModalConfirm = (expense) => {
    onAddSuggestion(expense);
    setModalVisible(false);
    setSelectedExpense(null);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setSelectedExpense(null);
  };

  const styles = StyleSheet.create({
    container: {
      margin: 20,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 15,
    },
    scrollContainer: {
      paddingVertical: 5,
    },
    suggestionBubble: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    suggestionIcon: {
      marginRight: 8,
    },
    suggestionText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "500",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Expenses</Text>
      <Text style={styles.subtitle}>
        {expenses.length > 0
          ? "Based on your current expenses, you might also need:"
          : "Here are some common expenses to get you started:"}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {suggestions.map((suggestionKey) => {
          const suggestion = expenseCategories[suggestionKey];
          return (
            <TouchableOpacity
              key={suggestionKey}
              style={styles.suggestionBubble}
              onPress={() => handleSuggestionPress(suggestionKey)}
            >
              <MaterialCommunityIcons
                name={suggestion.icon}
                size={18}
                color={theme.secondary}
                style={styles.suggestionIcon}
              />
              <Text style={styles.suggestionText}>{suggestion.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <AddExpenseModal
        visible={modalVisible}
        expense={selectedExpense}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </View>
  );
};

export default SuggestionBubbles;
