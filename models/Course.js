// models/Course.js

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  // Add other fields as needed
});

module.exports = mongoose.model('Course', courseSchema);
