// Dashboard page, used to display the user's expenses and a chart of the expenses
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import useAuthStore from "../features/auth/authStore";
import useExpenseStore from "../features/expenses/expenseStore";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseChart from "../components/ExpenseChart";
import Spinner from "../components/Spinner";

function Dashboard() {
    const navigate = useNavigate();

    // Get user and expenses 
    const { user } = useAuthStore();
    const expenses = useExpenseStore((state) => state.expenses);
    const isLoading = useExpenseStore((state) => state.isLoading);
    const isError = useExpenseStore((state) => state.isError);
    const message = useExpenseStore((state) => state.message);
    const getExpenses = useExpenseStore((state) => state.getExpenses);
    const reset = useExpenseStore((state) => state.reset);

    const [filterCategory, setFilterCategory] = useState('All');
    const [timeRange, setTimeRange] = useState('all');

    // The 'Watcher', which looks for changes in the state and updates the UI accordingly
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
            navigate('/login');
        } else {
            getExpenses();
        }

        return () => {
            reset();
        };
    }, [user, navigate, isError, message, getExpenses, reset]);

    // Get data filtered by Time (for the Chart)
    const timeFilteredData = expenses.filter(exp => {
        if (timeRange === 'all') return true;
        const days = parseInt(timeRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        return new Date(exp.createdAt) >= cutoffDate;
    });

    // Get data filtered by Time and Category (for the List)
    const listData = timeFilteredData.filter(exp => {
        if (filterCategory === 'All') return true;
        return exp.category === filterCategory;
    });

    // Sort by newest
    listData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Totals
    const totalSpent = listData.reduce((acc, item) => acc + item.amount, 0);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading mb-8'>
                <h1 className="text-3xl font-bold dark:text-white">Welcome, {user && user.username}</h1>
                <p className="text-gray-600 dark:text-gray-400">Here is your financial overview</p>
            </section>

            <section className="stats mb-8">
                <ExpenseChart expenses={timeFilteredData} />
            </section>
            <ExpenseForm />

            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="text-center md:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        ${totalSpent.toFixed(2)}
                    </h2>
                </div>

                <div className="flex gap-2">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="p-2 border rounded text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none"
                    >
                        <option value="all">All Time</option>
                        <option value="30">Last 30 Days</option>
                        <option value="7">Last 7 Days</option>
                    </select>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="p-2 border rounded text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:outline-none"
                    >
                        <option value="All">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <section className='content pb-10'>
                {listData.length > 0 ? (
                    <div className='expenses grid grid-cols-1 gap-2'>
                        {listData.map((expense) => (
                            <ExpenseItem key={expense._id} expense={expense} />
                        ))}
                    </div>
                ) : (
                    <h3 className="text-gray-500 text-center mt-10 dark:text-gray-400">No transactions found.</h3>
                )}
            </section>
        </>
    );
}

export default Dashboard;