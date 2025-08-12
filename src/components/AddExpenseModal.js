import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const AddExpenseModal = ({ visible, expense, onConfirm, onCancel }) => {
  const { theme } = useTheme();
  const [amount, setAmount] = useState('');

  const handleConfirm = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onConfirm({
        ...expense,
        amount: numAmount,
        id: Date.now().toString(),
      });
      setAmount('');
    }
  };

  const handleCancel = () => {
    setAmount('');
    onCancel();
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    modal: {
      backgroundColor: theme.surface,
      borderRadius: 20,
      padding: 25,
      margin: 10,
      width: '95%',
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    closeButton: {
      padding: 5,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      flex: 1,
      textAlign: 'center',
    },
    expenseInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      padding: 15,
      backgroundColor: theme.background,
      borderRadius: 12,
    },
    expenseIcon: {
      marginRight: 12,
    },
    expenseName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    expenseCategory: {
      fontSize: 12,
      color: theme.textSecondary,
      textTransform: 'capitalize',
      marginTop: 2,
    },
    inputContainer: {
      marginBottom: 25,
    },
    label: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 2,
      borderColor: theme.border,
      borderRadius: 12,
      padding: 15,
      fontSize: 18,
      color: theme.text,
      backgroundColor: theme.background,
      textAlign: 'center',
    },
    inputFocused: {
      borderColor: theme.primary,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 15,
    },
    button: {
      flex: 1,
      paddingVertical: 15,
      borderRadius: 12,
      alignItems: 'center',
    },
    cancelButton: {
      backgroundColor: theme.error,
    },
    confirmButton: {
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  if (!expense) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleCancel}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <View style={styles.modal}>
              <View style={styles.header}>
                <View style={{ width: 40 }} />
                <Text style={styles.title}>Add Expense</Text>
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

              <View style={styles.expenseInfo}>
                <MaterialCommunityIcons
                  name={expense.icon}
                  size={32}
                  color={theme.primary}
                  style={styles.expenseIcon}
                />
                <View>
                  <Text style={styles.expenseName}>{expense.name}</Text>
                  <Text style={styles.expenseCategory}>{expense.category}</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Monthly Amount ($)</Text>
                <TextInput
                  style={[
                    styles.input,
                    amount ? styles.inputFocused : {},
                  ]}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="numeric"
                  autoFocus
                />
              </View>

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

export default AddExpenseModal;