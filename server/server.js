const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//this allows us to use the contents of the '.env' file - which contains the environment variables
dotenv.config({ path: "./.env" });

const DB = process.env.DB_URI;

//mongoose way of connecting to the MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to the database");
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

//express way of initialising the server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
