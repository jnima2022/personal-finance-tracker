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
                {transactions.map(tx => (
                <li key={tx.id}>
                    <div>
                    <span style={{ fontWeight: 600, color: '#2563eb' }}>{tx.description}</span>
                    <span style={{ marginLeft: 10, color: '#888' }}>{tx.category}</span>
                    </div>
                    <div>
                    <span style={{ color: tx.amount < 0 ? '#e53e3e' : '#059669', fontWeight: 700 }}>
                        {Number(tx.amount).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                    </span>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
