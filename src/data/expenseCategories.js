export const expenseCategories = {
  // Housing
  'rent': { name: 'Rent', icon: 'home', category: 'housing' },
  'mortgage': { name: 'Mortgage', icon: 'home-variant', category: 'housing' },
  'utilities': { name: 'Utilities', icon: 'flash', category: 'housing' },
  'internet': { name: 'Internet', icon: 'wifi', category: 'housing' },
  'phone bill': { name: 'Phone Bill', icon: 'phone', category: 'housing' },
  'cable': { name: 'Cable/TV', icon: 'television', category: 'housing' },
  
  // Transportation
  'car payment': { name: 'Car Payment', icon: 'car', category: 'transportation' },
  'car insurance': { name: 'Car Insurance', icon: 'car-shield', category: 'transportation' },
  'gas': { name: 'Gas', icon: 'gas-station', category: 'transportation' },
  'public transport': { name: 'Public Transport', icon: 'bus', category: 'transportation' },
  'uber': { name: 'Uber/Lyft', icon: 'car-side', category: 'transportation' },
  'parking': { name: 'Parking', icon: 'parking', category: 'transportation' },
  
  // Food
  'groceries': { name: 'Groceries', icon: 'cart', category: 'food' },
  'eating out': { name: 'Eating Out', icon: 'silverware-fork-knife', category: 'food' },
  'coffee': { name: 'Coffee', icon: 'coffee', category: 'food' },
  'lunch': { name: 'Lunch', icon: 'food', category: 'food' },
  
  // Health & Fitness
  'gym membership': { name: 'Gym Membership', icon: 'dumbbell', category: 'health' },
  'health insurance': { name: 'Health Insurance', icon: 'medical-bag', category: 'health' },
  'doctor visits': { name: 'Doctor Visits', icon: 'doctor', category: 'health' },
  'pharmacy': { name: 'Pharmacy', icon: 'pill', category: 'health' },
  'dental': { name: 'Dental', icon: 'tooth', category: 'health' },
  
  // Entertainment
  'netflix': { name: 'Netflix', icon: 'netflix', category: 'entertainment' },
  'spotify': { name: 'Spotify', icon: 'spotify', category: 'entertainment' },
  'movies': { name: 'Movies', icon: 'movie', category: 'entertainment' },
  'games': { name: 'Games', icon: 'gamepad-variant', category: 'entertainment' },
  'fun': { name: 'Fun/Entertainment', icon: 'party-popper', category: 'entertainment' },
  
  // Personal Care
  'haircut': { name: 'Haircut', icon: 'content-cut', category: 'personal' },
  'clothing': { name: 'Clothing', icon: 'tshirt-crew', category: 'personal' },
  'personal care': { name: 'Personal Care', icon: 'face-woman', category: 'personal' },
  
  // Financial
  'savings': { name: 'Savings', icon: 'piggy-bank', category: 'financial' },
  'investments': { name: 'Investments', icon: 'trending-up', category: 'financial' },
  'credit card': { name: 'Credit Card Payment', icon: 'credit-card', category: 'financial' },
  'loan payment': { name: 'Loan Payment', icon: 'bank', category: 'financial' },
  
  // Miscellaneous
  'pet care': { name: 'Pet Care', icon: 'dog', category: 'pets' },
  'childcare': { name: 'Childcare', icon: 'baby-face', category: 'family' },
  'education': { name: 'Education', icon: 'school', category: 'education' },
  'books': { name: 'Books', icon: 'book', category: 'education' },
};

export const categoryRelatedExpenses = {
  'car payment': ['gas', 'car insurance', 'parking'],
  'rent': ['utilities', 'internet', 'cable'],
  'mortgage': ['utilities', 'internet', 'cable'],
  'gym membership': ['health insurance', 'personal care', 'doctor visits'],
  'groceries': ['eating out', 'lunch', 'coffee'],
  'netflix': ['spotify', 'cable', 'internet'],
  'health insurance': ['doctor visits', 'pharmacy', 'dental'],
  'pet care': ['pet care', 'doctor visits'],
  'childcare': ['education', 'health insurance'],
};