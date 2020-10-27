//This file holds all the functions also called controllers
//These are linked to the Model and they are responsible for the flow of the server-side application execution

const Entry = require("../models/entryModel");

//each controller is wrapped in a try/catch block - if no errors occur, the logic is executed, otherwise nothing occurs and the error is logged
//each controller uses the async/await asynchronous structure
//each controller sends a response back to the client

exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.find();

    res.status(200).json({
      status: "success",
      data: entries,
    });
  } catch (err) {
    console.log("Diary App error: ", err);
  }
};

exports.createEntry = async (req, res) => {
  try {
    const entry = await Entry.create(req.body);

    res.status(201).json({
      status: "success",
      data: entry,
    });
  } catch (err) {
    console.log("Diary App error: ", err);
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      data: entry,
    });
  } catch (err) {
    console.log("Diary App error: ", err);
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log("Diary App error: ", err);
  }
};

exports.postComment = async (req, res) => {
  try {
    await Entry.findByIdAndUpdate(req.params.id, {
      $push: { comments: req.body },
    });
    res.status(200).json({
      status: "success",
      data: "ok",
    });
  } catch (err) {
    console.log("Diary App error: ", err);
  }
};
