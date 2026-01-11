// Handles expenses actions (get, create, delete)
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

// Get all expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new expense
const createExpense = async (req, res) => {
    const { description, amount, category, date } = req.body;

    if (!description || !amount || !category) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    try {
        const expense = await Expense.create({
            description,
            amount,
            category,
            date: date || Date.now(),
            user: req.user.id, // Reference to the user who created the expense
        });

        res.status(201).json(expense);
    } catch (error) {
        console.error("Error in createExpense:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            res.status(404);
            throw new Error('Expense not found');
        }

        // Check if the user is authorized to delete the expense
        if (expense.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized');
        }

        await expense.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getExpenses,
    createExpense,
    deleteExpense,
};