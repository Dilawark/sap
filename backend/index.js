require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./dbConn');

connectDB();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(bodyParser.json());
app.use(cors());
app.use('/', require('./routes/studentRoutes'));
app.use('/', require('./routes/userRoutes'));

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});