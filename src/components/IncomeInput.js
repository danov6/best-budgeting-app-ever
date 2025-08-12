import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const IncomeInput = ({ income, onUpdateIncome }) => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [tempIncome, setTempIncome] = useState(income.toString());

  const handleSave = () => {
    const newIncome = parseFloat(tempIncome);
    if (!isNaN(newIncome) && newIncome >= 0) {
      onUpdateIncome(newIncome);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempIncome(income.toString());
    setIsEditing(false);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      padding: 20,
      borderRadius: 12,
      margin: 20,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    editButton: {
      padding: 5,
    },
    incomeDisplay: {
      alignItems: 'center',
    },
    incomeAmount: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.secondary,
    },
    incomeLabel: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 5,
    },
    inputContainer: {
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 24,
      color: theme.text,
      backgroundColor: theme.background,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      minWidth: 80,
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: theme.secondary,
    },
    cancelButton: {
      backgroundColor: theme.error,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Income</Text>
        {!isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color={theme.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={tempIncome}
              onChangeText={setTempIncome}
              placeholder="0.00"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              autoFocus
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.incomeDisplay}>
          <Text style={styles.incomeAmount}>
            ${income.toFixed(2)}
          </Text>
          <Text style={styles.incomeLabel}>
            Tap the pencil icon to edit
          </Text>
        </View>
      )}
    </View>
  );
};

export default IncomeInput;