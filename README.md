# Budget Bucket
#### Video Demo: https://youtu.be/famJN7CiJiA
#### Description
Budget Bucket is a full-stack personal finance application designed to help users track expenses, visualize spending habits, and manage their budget effectively. Built using the **MERN Stack** (MongoDB, Express, React, Node.js), it features a modern, responsive user interface styled with **Tailwind CSS**.

The application moves beyond simple CRUD operations by implementing secure authentication, real-time data visualization, and a robust global state management system. It solves the common problem of financial opacity by giving users an instant, graphical breakdown of where their money goes, allowing for filtering by time ranges (e.g., "Last 30 Days") and categories.

#### Distinctiveness and Complexity
This project satisfies the distinctiveness and complexity requirements by implementing a full-stack architecture that significantly exceeds the scope of the standard CS50x "Finance" problem set.

1.  **Full-Stack MERN Architecture:** Unlike the Python/SQL/Jinja stack used in the course, this project uses a completely different ecosystem. The backend is a REST API built with **Node.js/Express**, and the frontend is a Single Page Application (SPA) built with **React and Vite**.
2.  **State Management (Zustand):** Instead of simple React "prop drilling," I implemented **Zustand** for global state management. This follows a sophisticated "Service/Store" pattern where API calls are decoupled from the UI logic, handling asynchronous states (`isLoading`, `isError`, `isSuccess`) cleanly.
3.  **Data Visualization:** The project integrates **Recharts** to transform raw database arrays into dynamic Pie Charts. This required writing custom utility functions to aggregate expense data by category and map it to specific color schemes.
4.  **Advanced React Patterns:**
    * **Custom Hooks:** Implemented `useDarkMode` to handle theme switching and local storage persistence.
    * **Optimistic vs. Reactive UI:** Used reactive patterns for form validation and toast notifications (using `react-toastify` with deduplication logic) to provide professional user feedback.
    * **Portals/Modals:** Created a reusable `ConfirmationModal` component for destructive actions (deleting expenses) to improve UX and safety.
5.  **Security:** Authentication is handled manually using **JSON Web Tokens (JWT)** and **Bcrypt** for password hashing. Protected routes ensure that unauthorized users cannot access the dashboard.

#### File Manifest

### `/backend`
* `server.js`: The entry point for the backend server, connecting to MongoDB and defining routes.
* `models/userModel.js`: Mongoose schema defining the user structure.
* `models/expenseModel.js`: Mongoose schema for transaction data.
* `controllers/userController.js`: Logic for registration, login, and generating JWTs.
* `controllers/expenseController.js`: Logic for CRUD operations on expenses.
* `middleware/authMiddleware.js`: Protects private routes by verifying the Bearer token from HTTP headers.

### `/frontend`
* `src/features/auth/authService.js`: Handles HTTP requests (Axios) for authentication endpoints.
* `src/features/auth/authStore.js`: Zustand store managing user sessions, loading states, and persistence logic to prevent "ghost" sessions.
* `src/features/expenses/expenseService.js`: Handles HTTP requests for expense CRUD operations.
* `src/features/expenses/expenseStore.js`: Zustand store for fetching and managing the expense list.
* `src/hooks/useDarkMode.js`: Custom hook that toggles the Tailwind `dark` class on the HTML document and saves preference to LocalStorage.
* `src/utils/chartHelper.js`: Utility functions to calculate category totals and map categories to specific HEX colors.
* `src/pages/Dashboard.jsx`: The main protected view. Contains logic for filtering expenses by time (last 7/30 days) and category, and computing total balances.
* `src/pages/Register.jsx` / `Login.jsx`: Authentication forms with client-side validation, password visibility toggles, and toast feedback.
* `src/components/ExpenseChart.jsx`: A responsive Recharts component that renders the spending breakdown.
* `src/components/ConfirmationModal.jsx`: A reusable UI component that forces user confirmation before deleting data.
* `src/components/Spinner.jsx`: A pure CSS/Tailwind loading indicator used during async operations.
* `src/components/PasswordInput.jsx`: A reusable UI component that handles the password visibility toggle.

## How to Run

This application requires **Node.js** and **NPM** to be installed.

### 1. Backend Setup
Navigate to the backend folder and install dependencies:
    cd backend
    npm install
Create a .env file in the backend folder with your MongoDB URI and JWT Secret:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
Start the backend server:
```
npm run dev
```

### 2. Frontend Setup
Navigate to the frontend folder and install dependencies:
```
cd frontend
npm install
```
Start the React development server:
```
npm run dev
```
Open http://localhost:5173 in your browser to view the application.

