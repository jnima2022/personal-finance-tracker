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
        <div className="dashboard-container">
            <h1>Personal Finance Dashboard</h1>
            <h2>Spending Breakdown</h2>
            <Pie data={chartData} />
            <div style={{
                marginTop: '32px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '600px'
            }}>
            <div style={{
                background: '#e0e7ff',
                borderRadius: '10px',
                padding: '18px 30px',
                minWidth: '160px',
                textAlign: 'center',
                marginRight: '12px',
                flex: 1
            }}>
                <div style={{ fontSize: '1.2rem', color: '#2563eb', fontWeight: 700 }}>
                    {transactions.reduce((acc, t) => acc + Number(t.amount), 0).toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                </div>
                <div style={{ fontSize: '0.95rem', color: '#34495e', marginTop: '7px' }}>
                    Total Spent
                </div>
            </div>
            <div style={{
                background: '#fef3c7',
                borderRadius: '10px',
                padding: '18px 30px',
                minWidth: '160px',
                textAlign: 'center',
                marginLeft: '12px',
                flex: 1
            }}>
                <div style={{ fontSize: '1.2rem', color: '#f59e42', fontWeight: 700 }}>
                    {chartData.labels.length}
                </div>
                <div style={{ fontSize: '0.95rem', color: '#b45309', marginTop: '7px' }}>
                    Categories
                </div>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;
