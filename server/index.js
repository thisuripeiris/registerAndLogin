const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

// Middleware to parse JSON requests
app.use(express.json());

// Load routes
app.use('/', require('./routes/authRoutes'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, {

});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
    console.error('MongoDB connection error: ', err);
});

// Root route handler
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
