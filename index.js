const bodyParser = require("body-parser");
const cors = require("cors");
const express = require('express')
const mongoose = require("mongoose");

// To read the .env file
require("dotenv").config();

// Creates an Express application using the top-level function
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/address", require("./routes/getAddressByCoords"));
app.use("/meetups", require("./routes/getMeetups"));
app.use("/users", require("./routes/users"));


mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.on('open', () => console.log(`DB connected`))

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on http://localhost:${process.env.PORT}`);
  });
