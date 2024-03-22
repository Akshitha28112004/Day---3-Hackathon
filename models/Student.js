// models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Student', studentSchema);
