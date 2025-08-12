# Best Budgeting App Ever

A comprehensive React Native budgeting app that helps users manage their finances with intelligent suggestions and beautiful visualizations.

## Features

### Core Functionality
- **Income Management**: Easy-to-update monthly income with intuitive interface
- **Expense Tracking**: Add expenses with smart autocomplete and category suggestions
- **Visual Budget Overview**: Real-time pie chart showing budget allocation
- **Smart Categories**: Pre-defined expense categories with matching icons
- **Intelligent Suggestions**: AI-powered budget analysis and optimization tips

### Smart Features
- **Autocomplete**: Type "Car insurance" and see matching suggestions with car icons
- **Related Expenses**: Add car payment → get suggestions for gas and car insurance
- **Category Icons**: Each expense type has a relevant icon (house for rent, phone for phone bill, etc.)
- **Budget Analysis**: AI suggestions for budget optimization and alternatives

### Design
- **Dual Theme Support**: Beautiful light and dark mode themes
- **Color Scheme**: Dark blue primary with light green accents
- **Responsive Design**: Optimized for mobile devices
- **Smooth Animations**: Polished user experience with React Native Reanimated

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Database**: SQLite (Expo SQLite)
- **Charts**: React Native Chart Kit
- **Icons**: Material Community Icons
- **Styling**: React Native Paper + Custom themes
- **State Management**: React Context API

## Installation

1. **Prerequisites**
   ```bash
   npm install -g expo-cli
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run on Device**
   - Install Expo Go app on your phone
   - Scan the QR code from the terminal
   - Or run `npm run ios` / `npm run android` for simulators

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PieChart.js     # Budget visualization
│   ├── ExpenseInput.js # Add new expenses
│   ├── ExpenseList.js  # Display expense list
│   ├── IncomeInput.js  # Income management
│   ├── SuggestionBubbles.js # Related expense suggestions
│   └── AISuggestions.js # AI budget analysis
├── context/            # React Context providers
│   └── ThemeContext.js # Theme management
├── data/              # Static data and configurations
│   └── expenseCategories.js # Expense categories and icons
├── database/          # Database operations
│   └── database.js    # SQLite setup and queries
├── screens/           # App screens
│   └── BudgetScreen.js # Main budget screen
└── theme/             # Theme configurations
    └── colors.js      # Color schemes
```

## Expense Categories

The app includes 50+ pre-defined expense categories with icons:

### Housing
- Rent (🏠), Mortgage, Utilities (⚡), Internet (📶), Phone Bill (📱)

### Transportation  
- Car Payment (🚗), Car Insurance (🛡️), Gas (⛽), Public Transport (🚌)

### Food
- Groceries (🛒), Eating Out (🍽️), Coffee (☕)

### Health & Fitness
- Gym Membership (🏋️), Health Insurance (🏥), Doctor Visits (👨‍⚕️)

### Entertainment
- Netflix (📺), Spotify (🎵), Movies (🎬), Games (🎮)

And many more...

## Future Enhancements

### Phase 2
- **Credit Card Integration**: Link accounts for automatic expense tracking
- **Push Notifications**: Budget alerts and reminders
- **Advanced Analytics**: Spending trends and insights
- **Goal Setting**: Savings goals and progress tracking

### Phase 3
- **Multi-user Support**: Family budget sharing
- **Bill Reminders**: Automated payment notifications
- **Investment Tracking**: Portfolio integration
- **Export Features**: PDF reports and data export

## Database Schema

### Users Table
- `id`: Primary key
- `monthly_income`: User's monthly income
- `created_at`, `updated_at`: Timestamps

### Expenses Table
- `id`: Primary key
- `user_id`: Foreign key to users
- `name`: Expense name
- `amount`: Expense amount
- `category`: Expense category
- `icon`: Associated icon name
- `created_at`, `updated_at`: Timestamps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details