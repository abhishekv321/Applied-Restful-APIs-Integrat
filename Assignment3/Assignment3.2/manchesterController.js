// Import Model
const Manchester = require('./manchesterModel');

// For index
exports.index = async function (req, res) {
  try {
    const manchester = await Manchester.find({});
    res.json({
      status: "success",
      message: "Got Manchester Team Successfully!",
      data: manchester       
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err
    });
  }
};

// Add
exports.add = async function (req, res) {
  const manchester = new Manchester({
    first_name: req.body.first_name || '',
    last_name: req.body.last_name || '',
    rushing_yards: req.body.rushing_yards || 0,
    touchdowns_thrown: req.body.touchdowns_thrown || 0,
    sacks: req.body.sacks || 0,
    field_goals: req.body.field_goals || 0,
    missed_goals: req.body.missed_goals || 0,
    catches: req.body.catches || 0
  });

  try {
    await manchester.save();
    res.json({
      message: "New Player Added!",
      data: manchester
    });
  } catch (err) {
    res.json(err);
  }
};

// View
exports.view = async function (req, res) {
  try {
    const manchester = await Manchester.findById(req.params.manchester_id);
    res.json({
      message: 'Player Details',
      data: manchester
    });
  } catch (err) {
    res.send(err);
  }
};

// Update
exports.update = async function (req, res) {
  try {
    const manchester = await Manchester.findById(req.params.manchester_id);
    manchester.first_name = req.body.first_name || manchester.first_name;
    manchester.last_name = req.body.last_name || manchester.last_name;
    manchester.rushing_yards = req.body.rushing_yards || manchester.rushing_yards;
    manchester.touchdowns_thrown = req.body.touchdowns_thrown || manchester.touchdowns_thrown;
    manchester.sacks = req.body.sacks || manchester.sacks;
    manchester.field_goals = req.body.field_goals || manchester.field_goals;
    manchester.missed_goals = req.body.missed_goals || manchester.missed_goals;
    manchester.catches = req.body.catches || manchester.catches;
    
    await manchester.save();
    res.json({
      message: "Player Updated Successfully",
      data: manchester
    });
  } catch (err) {
    res.json(err);
  }
};

// Delete
exports.delete = async function (req, res) {
  try {
    await Manchester.deleteOne({ _id: req.params.manchester_id });
    res.json({
      status: "success",
      message: 'Player Deleted'
    });
  } catch (err) {
    res.send(err);
  }
};
