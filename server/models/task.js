const mongoose = require('mongoose')

//mission schema
//needs => mission name, data, importance level, mission tasks
const MissionSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('mission', MissionSchema, 'missions')
