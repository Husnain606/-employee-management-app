const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  class: { type: String },
  subjects: { type: [String] },
  attendance: { type: [Date] },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
