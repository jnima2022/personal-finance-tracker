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
            {budget.category}: ${budget.amount}
            </li>
        ))}
        </ul>
    </div>
    );
};

export default BudgetList;
