// Fetches and returns expense data from the backend
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses/';

// Get config headers
const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Create new expense
const createExpense = async (expenseData) => {
    const config = getConfig();
    const response = await axios.post(API_URL, expenseData, config);
    return response.data;
};

// Get all expenses
const getExpenses = async () => {
    const config = getConfig();
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Delete expense
const deleteExpense = async (expenseId) => {
    const config = getConfig();
    const response = await axios.delete(API_URL + expenseId, config);
    return response.data;
};

const expenseService = {
    createExpense,
    getExpenses,
    deleteExpense,
};

export default expenseService;