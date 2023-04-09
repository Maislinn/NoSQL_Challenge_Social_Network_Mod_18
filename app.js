const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const thoughtRoutes = require('./routes/thoughts');
const userRoutes = require('./routes/users');

mongoose.connect('mongodb://localhost:3003/' , { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes which should handle requests
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/users', userRoutes);

// Handle errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;