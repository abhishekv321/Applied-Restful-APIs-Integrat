// models/players.js
const mongoose = require('mongoose');

const playersSchema = new mongoose.Schema({
  name: String,
  rushing_yards:  Number,
  touchdowns_thrown:  Number,
  sacks: Number,
  field_goals:  Number,
  missed_goals:  Number,
  catches:  Number
});

module.exports = mongoose.model('Players', playersSchema);
