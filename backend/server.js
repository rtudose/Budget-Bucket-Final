const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Can accept JSON data

// Routes
app.get("/", (req, res) => {
    res.send("Budget Bucket API is running...");
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});