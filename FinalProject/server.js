// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Import the MongoDB model
const Books = require('./models/books');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mybooks', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Create a new book
app.post('/books', (req, res) => {
  const books = new Books({
    name: req.body.name,
    author: req.body.author,
    release_year: req.body.release_year,
    rating:req.body.rating
  });

  books.save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get all books
app.get('/books', (req, res) => {
  Books.find()
    .then(book => res.json(book))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Get books by author
app.get('/books/author/:authorName', (req, res) => {
  const authorName = req.params.authorName;

  Books.find({ author: authorName })
    .then(books => res.json(books))
    .catch(err => res.status(500).json({ error: err.message }));
});


// Get a specific book
app.get('/books/:id', (req, res) => {
  Books.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a specific book
app.put('/books/:id', (req, res) => {
    Books.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        author: req.body.author,
        release_year: req.body.release_year,
        rating:req.body.rating
    }, { new: true })
      .then(book => res.json(book))
      .catch(err => res.status(500).json({ error: err.message }));
  });


// Delete a specific book
app.delete('/books/:id', (req, res) => {
  Books.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'Book deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
