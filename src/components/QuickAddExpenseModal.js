import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import {
  expenseCategories,
  categoryRelatedExpenses,
} from "../data/expenseCategories";

const QuickAddExpenseModal = ({
  visible,
  onConfirm,
  onCancel,
  expenses = [],
}) => {
  const { theme } = useTheme();
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFromBubble, setIsFromBubble] = useState(false);

  // Get smart expense suggestions based on existing expenses
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
      "rent",
      "gym membership",
    ];
    commonSuggestions.forEach((key) => {
      if (
        suggestions.size < 8 &&
        !existingExpenseNames.includes(
          expenseCategories[key]?.name.toLowerCase()
        )
      ) {
        suggestions.add(key);
      }
    });

    // Ensure we always have at least 6 suggestions for the modal
    const allKeys = Object.keys(expenseCategories);
    for (let i = 0; i < allKeys.length && suggestions.size < 6; i++) {
      const key = allKeys[i];
      if (
        !existingExpenseNames.includes(
          expenseCategories[key].name.toLowerCase()
        )
      ) {
        suggestions.add(key);
      }
    }

    return Array.from(suggestions).slice(0, 8);
  };

  const smartSuggestions = getSuggestions();

  useEffect(() => {
    // Only show autocomplete if the user is typing manually (not from bubble selection)
    if (expenseName.length > 1 && !isFromBubble) {
      const filtered = Object.keys(expenseCategories).filter(
        (key) =>
          key.toLowerCase().includes(expenseName.toLowerCase()) ||
          expenseCategories[key].name
            .toLowerCase()
            .includes(expenseName.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [expenseName, isFromBubble]);

  const handleConfirm = () => {
    if (expenseName && expenseAmount) {
      const amount = parseFloat(expenseAmount);
      if (!isNaN(amount) && amount > 0) {
        const category = selectedCategory ||
          expenseCategories[expenseName.toLowerCase()] || {
            name: expenseName,
            icon: "cash",
            category: "other",
          };

        onConfirm({
          id: Date.now().toString(),
          name: category.name,
          amount: amount,
          icon: category.icon,
          category: category.category,
        });

        handleCancel(); // Reset form
      }
    }
  };

  const handleCancel = () => {
    setExpenseName("");
    setExpenseAmount("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedCategory(null);
    setIsFromBubble(false);
    onCancel();
  };

  const selectSuggestion = (key) => {
    const category = expenseCategories[key];
    setExpenseName(category.name);
    setSelectedCategory(category);
    setShowSuggestions(false);
    setIsFromBubble(false); // This is from autocomplete, not bubble
  };

  const selectBubbleSuggestion = (key) => {
    const category = expenseCategories[key];
    setExpenseName(category.name);
    setSelectedCategory(category);
    setIsFromBubble(true); // Mark as selected from bubble
    setShowSuggestions(false); // Hide any existing suggestions
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "100vw",
    },
    modal: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 25,
      margin: 10,
      width: "95%",
      maxWidth: "100vw",
      maxHeight: "95%",
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    closeButton: {
      padding: 5,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      flex: 1,
      textAlign: "center",
    },
    scrollContent: {
      flexGrow: 1,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 8,
      fontWeight: "600",
    },
    input: {
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.background,
    },
    inputFocused: {
      borderColor: theme.primary,
    },
    amountInput: {
      textAlign: "center",
      fontSize: 18,
    },
    suggestionsList: {
      maxHeight: 150,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      marginTop: 8,
      backgroundColor: theme.background,
    },
    suggestionItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    suggestionIcon: {
      marginRight: 10,
    },
    suggestionText: {
      fontSize: 16,
      color: theme.text,
    },
    bubblesContainer: {
      marginBottom: 20,
    },
    bubblesTitle: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 12,
      fontWeight: "600",
    },
    bubblesScrollView: {
      paddingVertical: 5,
    },
    suggestionBubble: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.background,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    bubbleIcon: {
      marginRight: 6,
    },
    bubbleText: {
      fontSize: 12,
      color: theme.text,
      fontWeight: "500",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 15,
      marginTop: 10,
    },
    button: {
      flex: 1,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: theme.error,
    },
    confirmButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.modal}>
              <View style={styles.header}>
                <View style={{ width: 30 }} />
                <Text style={styles.title}>Quick Add Expense</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCancel}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color={theme.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Smart Expense Suggestions */}
                <View style={styles.bubblesContainer}>
                  <Text style={styles.bubblesTitle}>
                    {expenses.length > 0
                      ? "Suggested for You"
                      : "Popular Expenses"}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.bubblesScrollView}
                  >
                    {smartSuggestions.map((key) => {
                      const expense = expenseCategories[key];
                      if (!expense) return null;
                      return (
                        <TouchableOpacity
                          key={key}
                          style={styles.suggestionBubble}
                          onPress={() => selectBubbleSuggestion(key)}
                        >
                          <MaterialCommunityIcons
                            name={expense.icon}
                            size={16}
                            color={theme.secondary}
                            style={styles.bubbleIcon}
                          />
                          <Text style={styles.bubbleText}>{expense.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>

                {/* Expense Name Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Expense Name</Text>
                  <TextInput
                    style={[
                      styles.input,
                      expenseName ? styles.inputFocused : {},
                    ]}
                    value={expenseName}
                    onChangeText={(text) => {
                      setExpenseName(text);
                      // If user starts typing manually, reset bubble flag
                      if (isFromBubble && text !== selectedCategory?.name) {
                        setIsFromBubble(false);
                      }
                    }}
                    placeholder="e.g., Rent, Groceries, Car Insurance"
                    placeholderTextColor={theme.textSecondary}
                  />

                  {/* Autocomplete Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <FlatList
                      data={suggestions}
                      keyExtractor={(item) => item}
                      style={styles.suggestionsList}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.suggestionItem}
                          onPress={() => selectSuggestion(item)}
                        >
                          <MaterialCommunityIcons
                            name={expenseCategories[item].icon}
                            size={20}
                            color={theme.primary}
                            style={styles.suggestionIcon}
                          />
                          <Text style={styles.suggestionText}>
                            {expenseCategories[item].name}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  )}
                </View>

                {/* Amount Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Monthly Amount ($)</Text>
                  <TextInput
                    style={[
                      styles.input,
                      styles.amountInput,
                      expenseAmount ? styles.inputFocused : {},
                    ]}
                    value={expenseAmount}
                    onChangeText={setExpenseAmount}
                    placeholder="0.00"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                  />
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.buttonText}>Add Expense</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default QuickAddExpenseModal;
