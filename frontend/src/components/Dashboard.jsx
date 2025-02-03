import { faker } from '@faker-js/faker';

// Generate fake transactions for initial UI testing
const generateFakeTransactions = () => {
return Array.from({ length: 10 }, () => ({
    id: faker.string.uuid(),
    description: faker.finance.transactionDescription(),
    amount: faker.finance.amount({ min: 10, max: 1000 }),
    category: faker.helpers.arrayElement(['Food', 'Rent', 'Utilities']),
    date: faker.date.past().toISOString().split('T')[0],
}));
};
