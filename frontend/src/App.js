import React from 'react';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import BudgetList from './components/BudgetList';
import AddTransactionForm from './components/AddTransactionForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Personal Finance Tracker</h1>
      <Dashboard />
      <TransactionList />
      <BudgetList />
      <AddTransactionForm onTransactionAdded={() => {
        // You can add logic here to refresh other components if needed
      }} />
    </div>
  );
}

export default App;
