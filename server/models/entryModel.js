const mongoose = require("mongoose");

const entrySchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: String,
  date: Date,
});

const Entry = mongoose.model("entries", entrySchema);

module.exports = Entry;
