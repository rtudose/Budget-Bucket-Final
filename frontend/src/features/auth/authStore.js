// Manages authentication state
import { create } from 'zustand';
import authService from './authService';

// Create auth store
const useAuthStore = create((set) => ({
    // Initialize store as empty (NULL)
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

    // Check localStorage for user
    checkUser: () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            set({ user: user });
        } else {
            set({ user: null });
        }
    },

    // Reset helper
    reset: () => {
        set({
            isLoading: false,
            isSuccess: false,
            isError: false,
            message: '',
        });
    },

    // Register action
    register: async (user) => {
        set({
            isLoading: true,
            isError: false,
            isSuccess: false,
            message: '',
        });
        try {
            const response = await authService.register(user);
            set({
                isLoading: false,
                isSuccess: true,
                user: response,
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
                message: message,
                user: null,
            });
        }
    },

    // Login action
    login: async (user) => {
        set({
            isLoading: true,
            isError: false,
            message: '',
        });
        try {
            const response = await authService.login(user);
            set({
                isLoading: false,
                isSuccess: true,
                user: response,
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
                message: message,
                user: null,
            });
        }
    },

    // Logout action
    logout: () => {
        authService.logout();
        set({
            user: null,
            isError: false,
            isSuccess: false,
            isLoading: false,
            message: '',
        });
    },
}));

export default useAuthStore;
