// Manages expense state
import { create } from "zustand";
import expenseService from "./expenseService";

// Create expense store
const useExpenseStore = create((set, get) => ({
    // Initialize store as empty (NULL)
    expenses: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',

    // Reset helper
    reset: () => set({
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
    }),

    // Create expense action
    createExpense: async (expenseData) => {
        set({
            isLoading: true,
            isError: false,
        });
        try {
            const newExpense = await expenseService.createExpense(expenseData);
            set((state) => ({
                expenses: [newExpense, ...state.expenses],
                isLoading: false,
                isSuccess: true,
            }));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            set({
                isLoading: false,
                isError: true,
                message,
            });
        }
    },

    // Get expenses action
    getExpenses: async () => {
        set({
            isLoading: true,
            isError: false,
        });
        try {
            const expenses = await expenseService.getExpenses();
            set({
                isLoading: false,
                isSuccess: true,
                expenses,
            });
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            set({
                isLoading: false,
                isError: true,
                message,
            });
        }
    },

    // Delete expense action
    deleteExpense: async (id) => {
        set({
            isLoading: true,
            isError: false,
        });
        try {
            await expenseService.deleteExpense(id);
            set((state) => ({
                isLoading: false,
                isSuccess: true,
                expenses: state.expenses.filter((expense) => expense._id !== id),
            }));
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            set({
                isLoading: false,
                isError: true,
                message,
            });
        }
    },
}));

export default useExpenseStore;