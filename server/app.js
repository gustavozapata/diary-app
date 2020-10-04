const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const entryRouter = require("./routes/entryRoutes");

const app = express();

//to allow access from any IP address
app.use(cors());

//to access the body of the request (e.g. when using POST)
app.use(express.json());

//to display a log of all the requests
app.use(morgan("tiny"));

//any request to this path will take the request to that router
app.use("/api/entries", entryRouter);

module.exports = app;
