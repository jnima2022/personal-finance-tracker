import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetList = () => {
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
    axios.get('/budgets')
        .then(response => setBudgets(response.data))
        .catch(error => console.error('Error fetching budgets:', error));
    }, []);

    return (
        <div>
            <h2>Budgets</h2>
            <ul>
                {budgets.map(budget => (
                <li key={budget.id}>
                    <div>
                    <span style={{ fontWeight: 600 }}>{budget.category}</span>
                    </div>
                    <div>
                    <span style={{ color: '#2563eb', fontWeight: 700 }}>
                        {Number(budget.amount).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                    </span>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
};

export default BudgetList;
