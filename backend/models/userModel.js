const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  photo: {
    type: String,
    default:"none" // Path to the uploaded photo
  }
}
);

module.exports = mongoose.model('user', UserSchema);
