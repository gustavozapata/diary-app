const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 0,
  },
  comments: [Object],
});

const Entry = mongoose.model("entries", entrySchema);

module.exports = Entry;
