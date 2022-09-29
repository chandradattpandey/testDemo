const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  heading: { type: String },
  description: { type: String },
  status: { type: String },
  creation_date: { type: Date }
});

module.exports = mongoose.model('todo', todoSchema);