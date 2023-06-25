var mongoose = require('mongoose');
//schema
var manchesterSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    rushing_yards: {
        type: Number,
        required: true
    },
    touchdowns_thrown: {
        type: Number,
        required: true
    },
    sacks: {
        type: Number,
        required: true
    },
    field_goals: {
        type: Number,
        required: true
    },
    missed_goals: {
        type: Number,
        required: true
    },
    catches:{
        type: Number,
        required: true
    }
});

const Mteam = module.exports = mongoose.model('manchester', manchesterSchema);

module.exports.get = async (callback, limit) => {
  const manchesters = await Mteam.find(callback).limit(limit);
  return manchesters;
};