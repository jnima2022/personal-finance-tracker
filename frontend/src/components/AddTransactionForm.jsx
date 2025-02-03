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
    axios.post('/transactions', transaction)
        .then(response => {
        console.log('Transaction added:', response.data);
        onTransactionAdded(response.data);
        setTransaction({ description: '', amount: '', category: '', date: '' });
        })
        .catch(error => console.error('Error adding transaction:', error));
    };

    return (
    <form onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>
        <input
        type="text"
        name="description"
        value={transaction.description}
        onChange={handleChange}
        placeholder="Description"
        required
        />
        <input
        type="number"
        name="amount"
        value={transaction.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
        />
        <input
        type="text"
        name="category"
        value={transaction.category}
        onChange={handleChange}
        placeholder="Category"
        required
        />
        <input
        type="date"
        name="date"
        value={transaction.date}
        onChange={handleChange}
        required
        />
        <button type="submit">Add Transaction</button>
    </form>
    );
};

export default AddTransactionForm;
