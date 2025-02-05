import React from 'react';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import BudgetList from './components/BudgetList';
import AddTransactionForm from './components/AddTransactionForm';
import './App.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

function App() {
  return (
    <div className="App">
      <h1>💰 Personal Finance Tracker</h1>

      <div className="dashboard-container">
        <Dashboard />
      </div>

      <div className="transaction-section">
        <TransactionList />
      </div>

      <div className="budget-section">
        <BudgetList />
      </div>

      <div className="form-section">
        <AddTransactionForm onTransactionAdded={() => { }} />
      </div>
    </div>
  );
}

export default App;