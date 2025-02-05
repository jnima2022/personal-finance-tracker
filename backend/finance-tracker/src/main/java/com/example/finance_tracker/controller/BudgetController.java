package com.example.finance_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.finance_tracker.model.Budget;
import com.example.finance_tracker.repository.BudgetRepository;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    @Autowired
    private BudgetRepository budgetRepository;

    @GetMapping
    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }

    @PostMapping
    public Budget createBudget(@RequestBody Budget budget) {
        return budgetRepository.save(budget);
    }
}
