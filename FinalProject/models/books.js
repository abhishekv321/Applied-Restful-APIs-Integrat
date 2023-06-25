// models/players.js
const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  name: String,
  author:  String,
  release_year: Number,
  rating:  Number,
});

module.exports = mongoose.model('Books', booksSchema);
