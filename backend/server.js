const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/visitors', require('./routes/visitorRoutes'));
app.use('/api/assets', require('./routes/assetRoutes'));

// Health Check Route
app.get('/', (req, res) => {
  res.send('MERN Stack API Server is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});