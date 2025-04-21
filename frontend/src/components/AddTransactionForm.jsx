import React, { useState } from 'react';
import axios from 'axios';

const AddTransactionForm = ({ onTransactionAdded }) => {
    const [transaction, setTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
    });

    const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/transactions', transaction) // ✅ FIX API PREFIX
            .then(() => {
                onTransactionAdded(); // ✅ Trigger refresh
                setTransaction({ description: '', amount: '', category: '', date: '' });
            })
            .catch(error => console.error('Error adding transaction:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="description"
                value={transaction.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <input
                name="amount"
                value={transaction.amount}
                onChange={handleChange}
                placeholder="Amount"
                type="number"
                step="0.01"
                required
            />
            <input
                name="category"
                value={transaction.category}
                onChange={handleChange}
                placeholder="Category"
                required
            />
            <input
                name="date"
                value={transaction.date}
                onChange={handleChange}
                type="date"
                required
            />
            <button type="submit">Add Transaction</button>
        </form>
    );
};

export default AddTransactionForm;
