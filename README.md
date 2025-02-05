# personal-finance-tracker
#Fullstack Application

## Overview
This project is a full-stack web application for personal finance management. It allows users to track transactions, set budgets, and visualize spending patterns. The application uses Spring Boot for the backend API and React for the frontend user interface.

## Features
- Track income and expenses
- Categorize transactions
- Set and monitor budgets
- Visualize spending patterns with charts

## Tech Stack
- Backend: Spring Boot (Java)
- Frontend: React
- Database: H2 (development), PostgreSQL (production)
- API: RESTful
- Data Visualization: Chart.js
- Fake Data Generation: Java Faker (backend), Faker.js (frontend)

## Prerequisites
- Java JDK 17 or later
- Node.js and npm
- Maven

## Setup and Installation

### Backend Setup
1. Clone the repository:
  git clone https://github.com/jnima2022/personal-finance-tracker.git
  cd personal-finance-tracker

2. Navigate to the backend directory:
  cd backend

3. Build and run the Spring Boot application:
  mvn spring-boot:run

The backend will start on `http://localhost:8080`.

### Frontend Setup
1. Navigate to the frontend directory:
  cd ../frontend

2. Install dependencies:
  npm install

3. Start the React development server:
  npm start

The frontend will be accessible at `http://localhost:3000`.

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. Use the interface to add transactions, set budgets, and view your financial dashboard.
3. Explore the various features like transaction listing, budget setting, and spending visualizations.

## API Endpoints
- `GET /api/transactions`: Retrieve all transactions
- `POST /api/transactions`: Add a new transaction
- `GET /api/budgets`: Retrieve all budgets
- `POST /api/budgets`: Create a new budget

## Development

### Backend Development
- The main application class is `FinanceTrackerApplication.java`.
- Controllers are located in the `controllers` package.
- Entity models are in the `models` package.
- Repositories for database operations are in the `repositories` package.

### Frontend Development
- The main React component is `App.js`.
- Individual components like `Dashboard`, `TransactionList`, etc., are in the `components` folder.
- API calls are made using Axios.

## Future Enhancements
- Implement user authentication and authorization
- Add budget forecasting algorithms
- Integrate with real banking APIs for automatic transaction imports
- Develop mobile applications for iOS and Android
