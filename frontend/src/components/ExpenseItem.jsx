// Expense Item used to display (and delete) a single expense
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import useExpenseStore from '../features/expenses/expenseStore';
import { CATEGORY_COLORS } from '../utils/chartHelper';
import ConfirmationModal from './ConfirmationModal';

function ExpenseItem({ expense }) {
    const deleteExpense = useExpenseStore((state) => state.deleteExpense);
    const [isModalOpen, setIsModalOpen] = useState(false);


    // Format the date and time (for a 'Date at Time' display)
    const dateObj = new Date(expense.createdAt);
    const formattedDate = dateObj.toLocaleDateString('en-US');
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const categoryColor = CATEGORY_COLORS[expense.category] || '#gray-500';

    // Handle delete click (open modal)
    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    // Handle confirm delete (delete expense and close modal)
    const onConfirmDelete = () => {
        deleteExpense(expense._id);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className='expense bg-white dark:bg-gray-800 p-4 mb-2 rounded flex justify-between items-center shadow-sm border-l-4 transition-colors duration-300'
                style={{ borderLeftColor: categoryColor }}>
                <div>
                    <h4 className="font-bold text-lg capitalize text-gray-800 dark:text-gray-100">{expense.description}</h4>
                    <p className="text-gray-500 text-sm dark:text-gray-400">
                        {formattedDate} at {formattedTime}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-700" style={{ color: categoryColor }}>
                        {expense.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        ${expense.amount.toFixed(2)}
                    </h3>
                    {/* Trigger delete modal */}
                    <button
                        onClick={handleDeleteClick}
                        className="text-gray-400 hover:text-red-500 transition"
                    >
                        <FaTimes />
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={onConfirmDelete}
                title="Delete Transaction"
                message={`Are you sure you want to delete "${expense.description}"? This action cannot be undone.`}
            />
        </>
    );
}

export default ExpenseItem;
