const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  designation: String,
  gender: String,
  course: [String],
  image: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
