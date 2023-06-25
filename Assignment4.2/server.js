// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// Import the MongoDB model
const Players = require('./models/players');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myplayers', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Create Express app
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Create a new player
app.post('/players', (req, res) => {
  const players = new Players({
    name: req.body.name,
    rushing_yards: req.body.rushing_yards,
    touchdowns_thrown: req.body.touchdowns_thrown,
    sacks:req.body.sacks,
    field_goals:  req.body.field_goals,
    missed_goals:  req.body.missed_goals,
    catches:  req.body.catches
  });

  players.save()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});




// Get all players
app.get('/players', (req, res) => {
  Players.find()
    .then(player => res.json(player))
    .catch(err => res.status(500).json({ error: err.message }));
});




// Get a specific player
app.get('/players/:id', (req, res) => {
  Players.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update a specific player
app.put('/players/:id', (req, res) => {
    Players.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      rushing_yards: req.body.rushing_yards,
      touchdowns_thrown: req.body.touchdowns_thrown,
      sacks:req.body.sacks,
      field_goals:  req.body.field_goals,
      missed_goals:  req.body.missed_goals,
      catches:  req.body.catches
    }, { new: true })
      .then(player => res.json(player))
      .catch(err => res.status(500).json({ error: err.message }));
  });


// Delete a specific player
app.delete('/players/:id', (req, res) => {
  Players.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'player deleted' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
