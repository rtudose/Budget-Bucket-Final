// Expense Form used to create a new expense
import { useState } from "react";
import { toast } from 'react-toastify';
import useExpenseStore from "../features/expenses/expenseStore";

function ExpenseForm() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Other');

    // Handle form submission (create expense and validate)
    const createExpense = useExpenseStore((state) => state.createExpense);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text || !amount) {
            toast.error('Please add an expense and the amount spent');
            return;
        } else if (amount <= 0) {
            toast.error('Amount must be greater than 0');
            return;
        }

        createExpense({
            description: text,
            amount: +amount,
            category,
        });

        setText('');
        setAmount('');
        setCategory('Other');
        toast.success('Expense added successfully');
    };

    // Style for input fields
    const inputClass = "w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500 transition-colors";

    return (
        <section className='form mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300'>
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4">Add New Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className='form-group'>
                        <label htmlFor='text' className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">Expense</label>
                        <input
                            type='text'
                            name='text'
                            id='text'
                            className={inputClass}
                            value={text}
                            placeholder='e.g. Groceries'
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='amount' className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">Amount</label>
                        <input
                            type='number'
                            name='amount'
                            id='amount'
                            className={inputClass}
                            value={amount}
                            placeholder='0.00'
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='category' className="block text-gray-700 dark:text-gray-300 font-bold mb-2 text-sm">Category</label>
                        <select
                            name="category"
                            id="category"
                            className={inputClass}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className='form-group mt-4'>
                    <button className='w-full bg-black dark:bg-blue-600 text-white py-2 rounded hover:opacity-80 transition font-bold' type='submit'>
                        Add Transaction
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ExpenseForm;
