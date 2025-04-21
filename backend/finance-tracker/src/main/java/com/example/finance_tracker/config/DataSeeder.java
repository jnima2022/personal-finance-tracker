package com.example.finance_tracker.config;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.finance_tracker.model.Budget;
import com.example.finance_tracker.model.Transaction;
import com.example.finance_tracker.model.UserProfile;
import com.example.finance_tracker.repository.BudgetRepository;
import com.example.finance_tracker.repository.TransactionRepository;
import com.example.finance_tracker.repository.UserProfileRepository;
import com.github.javafaker.Faker;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UserProfileRepository userRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    private final Faker faker = new Faker();

    @Override
    public void run(String... args) throws Exception {
        // Create a demo user
        UserProfile user = new UserProfile();
        user.setUsername("demo_user");
        user.setEmail("demo@example.com");
        user.setPassword("demo123");
        userRepository.save(user);

        // Generate 50 fake transactions
        for (int i = 0; i < 50; i++) {
            Transaction transaction = new Transaction();
            transaction.setDescription(faker.commerce().productName());
            transaction.setAmount(faker.number().randomDouble(2, 10, 1000));
            transaction.setDate(LocalDate.now().minusDays(faker.number().numberBetween(1, 30)));
            transaction.setCategory(faker.options().option("Food", "Rent", "Utilities", "Entertainment"));
            transaction.setUser(user);
            transactionRepository.save(transaction);
        }

        // Generate 5 budgets
        String[] categories = {"Food", "Rent", "Utilities", "Entertainment"};
        for (String category : categories) {
            Budget budget = new Budget();
            budget.setCategory(category);
            budget.setAmount(faker.number().randomDouble(2, 500, 2000));
            budget.setStartDate(LocalDate.now().withDayOfMonth(1));
            budget.setEndDate(LocalDate.now().withDayOfMonth(1).plusMonths(1));
            budget.setUser(user);
            budgetRepository.save(budget);
        }
    }
}
