import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('budget.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create users table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          monthly_income REAL DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );

      // Create expenses table
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER DEFAULT 1,
          name TEXT NOT NULL,
          amount REAL NOT NULL,
          category TEXT,
          icon TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users (id)
        );`
      );

      // Create expense_categories table for future expansion
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expense_categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          icon TEXT,
          category_group TEXT,
          is_common BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`
      );

      // Insert default user if not exists
      tx.executeSql(
        `INSERT OR IGNORE INTO users (id, monthly_income) VALUES (1, 0);`
      );

      console.log('Database initialized successfully');
      resolve();
    }, (error) => {
      console.error('Database initialization error:', error);
      reject(error);
    });
  });
};

export const saveIncome = (income) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE users SET monthly_income = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1;`,
        [income],
        (_, result) => {
          console.log('Income saved successfully');
          resolve(result);
        },
        (_, error) => {
          console.error('Error saving income:', error);
          reject(error);
        }
      );
    });
  });
};

export const getIncome = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT monthly_income FROM users WHERE id = 1;`,
        [],
        (_, { rows }) => {
          const income = rows.length > 0 ? rows.item(0).monthly_income : 0;
          resolve(income);
        },
        (_, error) => {
          console.error('Error getting income:', error);
          reject(error);
        }
      );
    });
  });
};

export const saveExpense = (expense) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO expenses (name, amount, category, icon) VALUES (?, ?, ?, ?);`,
        [expense.name, expense.amount, expense.category, expense.icon],
        (_, result) => {
          console.log('Expense saved successfully');
          resolve({ ...expense, id: result.insertId });
        },
        (_, error) => {
          console.error('Error saving expense:', error);
          reject(error);
        }
      );
    });
  });
};

export const getExpenses = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM expenses ORDER BY created_at DESC;`,
        [],
        (_, { rows }) => {
          const expenses = [];
          for (let i = 0; i < rows.length; i++) {
            expenses.push(rows.item(i));
          }
          resolve(expenses);
        },
        (_, error) => {
          console.error('Error getting expenses:', error);
          reject(error);
        }
      );
    });
  });
};

export const deleteExpense = (expenseId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM expenses WHERE id = ?;`,
        [expenseId],
        (_, result) => {
          console.log('Expense deleted successfully');
          resolve(result);
        },
        (_, error) => {
          console.error('Error deleting expense:', error);
          reject(error);
        }
      );
    });
  });
};

export const updateExpense = (expenseId, updates) => {
  return new Promise((resolve, reject) => {
    const { name, amount, category, icon } = updates;
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE expenses SET name = ?, amount = ?, category = ?, icon = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?;`,
        [name, amount, category, icon, expenseId],
        (_, result) => {
          console.log('Expense updated successfully');
          resolve(result);
        },
        (_, error) => {
          console.error('Error updating expense:', error);
          reject(error);
        }
      );
    });
  });
};