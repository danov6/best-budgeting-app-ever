import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import QuickAddExpenseModal from "./QuickAddExpenseModal";

const TopNavBar = ({ title = "Best Budgeting App", onAddExpense, expenses = [] }) => {
  const { theme } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    navbar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    leftSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    menuButton: {
      padding: 5,
      marginRight: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    rightSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    addButton: {
      padding: 5,
    },
  });

  const handleAddExpense = (expense) => {
    if (onAddExpense) {
      onAddExpense(expense);
    }
    setShowAddModal(false);
  };

  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={theme.primary}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={24}
              color={theme.primary}
            />
          </TouchableOpacity>

        </View>
      </View>

      <QuickAddExpenseModal
        visible={showAddModal}
        onConfirm={handleAddExpense}
        onCancel={handleCancelAdd}
        expenses={expenses}
      />
    </SafeAreaView>
  );
};

export default TopNavBar;
