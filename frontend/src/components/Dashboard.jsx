import React, { useState, useEffect, useCallback } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
        }]
    });

    const updateChartData = (transactions) => {
        const categories = {};
        transactions.forEach(transaction => {
          // Normalize category (trim whitespace and optionally convert to lower case)
        const category = transaction.category ? transaction.category.trim() : 'Uncategorized';
          // Convert amount to a number
        const amount = parseFloat(transaction.amount);
    
        if (!isNaN(amount)) {
            if (categories[category]) {
                categories[category] += amount;
        } else {
            categories[category] = amount;
            }
        }
        });
        
        // Debug: Log the aggregated categories
        console.log("Aggregated categories:", categories);

        setChartData({
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
                ],
            }]
        });
    };

    // ✅ Wrap fetchTransactions in useCallback
    const fetchTransactions = useCallback(() => {
        axios.get('/transactions')
            .then(response => {
                console.log("Fetched Transactions:", response.data); // ✅ Debugging
                setTransactions(response.data);
                updateChartData(response.data);
            })
            .catch(error => console.error('Error fetching transactions:', error));
    }, []); // ✅ Empty array ensures the function doesn't change on re-renders

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]); // ✅ Add fetchTransactions as dependency

    useEffect(() => {
        console.log("Updated Chart Data:", chartData); // ✅ Debugging
    }, [chartData]); 

    return (
        <div>
            <h2>Financial Dashboard</h2>
            
            <div style={{ width: '300px', height: '300px' }}>
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
