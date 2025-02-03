import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
    // Fetch transactions from the backend
    axios.get('/transactions')
        .then(response => {
            setTransactions(response.data);
            updateChartData(response.data);
        })
        .catch(error => console.error('Error fetching transactions:', error));
    }, []);

    const updateChartData = (transactions) => {
    const categories = {};
    transactions.forEach(transaction => {
        if (categories[transaction.category]) {
        categories[transaction.category] += transaction.amount;
        } else {
        categories[transaction.category] = transaction.amount;
        }
    });

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
