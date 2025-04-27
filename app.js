// import the express module
const express = require("express");
const userRouter = require("./routes/userRoutes");

// create an application by express() function in express library
const app = express();

// middleware to parse the request body
app.use(express.json());

app.use("/api/users",userRouter);

module.exports = app;