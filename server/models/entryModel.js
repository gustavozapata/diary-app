//This file creates the schema that defines the different models of the application
//this model is composed of different attributes each with a data type and some options

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
    type: String,
    default: "0",
  },
  comments: [Object],
});

const Entry = mongoose.model("entries", entrySchema);

module.exports = Entry;
