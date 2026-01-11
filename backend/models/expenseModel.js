// Defining expense model
const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            trim: true,
            maxlength: [100, 'Description cannot exceed 100 characters'],
        },
        amount: {
            type: Number,
            required: [true, 'Please add a valid amount'],
            validate: {
                validator: function (v) {
                    return v > 0;
                },
                message: 'Amount must be greater than 0',
            },
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Expense', expenseSchema);