import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('/transactions')
        .then(response => setTransactions(response.data))
        .catch(error => console.error('Error fetching transactions:', error));
    }, []);

    return (
    <div>
        <h2>Transactions</h2>
        <ul>
        {transactions.map(transaction => (
            <li key={transaction.id}>
            {transaction.description} - ${transaction.amount} ({transaction.category})
            </li>
        ))}
        </ul>
    </div>
    );
};

export default TransactionList;
