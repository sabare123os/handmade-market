const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// ✅ Correct: only import the router
const router = require('../route/router');

app.use(cors());
app.use(express.json());
app.use(router);

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://sabari:sabari29@cluster0.raxl5u0.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Start the server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
