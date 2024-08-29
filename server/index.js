const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser middleware to handle request bodies
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware to enable Cross-Origin Resource Sharing
const userRoutes = require("./routes/user"); // Import user routes
const todoRoutes = require("./routes/todo");
const { countTodos } = require("./controllers/todo");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

// Configure body-parser middleware to handle URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the user routes
app.use("/users", userRoutes);

// Use the todo routes
app.use("/todos", todoRoutes);

app.get("/countTodos", countTodos);

// Connect to MongoDB using Mongoose with the provided connection string
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "iTodo", // Specify the database name
  })
  .then(() => {
    console.log("Database connected"); // Log a success message if the database connection is successful
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error); // Log an error message if the database connection fails
  });

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log("Server running on", port); // Log a message indicating that the server is running
});

module.exports = app;
