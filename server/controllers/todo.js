const Todo = require("../models/todo.js");
const User = require('../models/user.js');

// Function to add a new Todo for a specific user
const addTodo = async (req, res) => {
  try {
    console.log('adding todo');
    
    // Extract userId from the request parameters and todo details from the request body
    const userId = req.params.userId;
    const { title, category, dueDate } = req.body;

    // Create a new Todo document using the provided data
    const newTodo = new Todo({
      title,
      category,
      dueDate,
    });

    // Save the new Todo document to the database
    await newTodo.save();

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      // If user is not found, respond with a 404 status
      return res.status(404).json({ message: "User not found" });
    }

    // Add the newly created Todo's ID to the user's todos array
    user.todos.push(newTodo._id);

    // Save the updated user document to the database
    await user.save();

    // Respond with a success message and the new Todo data
    res.status(200).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with a generic message
    res.status(500).json({ message: "Todo not added" });
  }
};

// Function to get all Todos associated with a specific user
const getUserTodos = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by their ID and populate their todos array with Todo documents
    const user = await User.findById(userId).populate("todos");

    if (!user) {
      // If user is not found, respond with a 404 status
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user's todos
    res.status(200).json({ todos: user.todos });
  } catch (error) {
    // If an error occurs, respond with a generic error message
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Function to toggle the status of a specific Todo between 'completed' and 'pending'
const toggleStatus = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    // Find the Todo by its ID
    const todo = await Todo.findById(todoId);

    // Toggle the status between 'completed' and 'pending'
    todo.status = (todo.status === 'completed') ? 'pending' : 'completed';

    // Save the updated Todo document to the database
    await todo.save();

    // Respond with a success message
    res.status(200).json({ message: "Todo status changed" });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with the error
    res.status(500).json({ error: error });
  }
};

// Function to toggle the priority status of a specific Todo
const togglePriority = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    // Find the Todo by its ID
    const todo = await Todo.findById(todoId);

    // Toggle the priority status
    todo.isPriority = !todo.isPriority;

    // Save the updated Todo document to the database
    await todo.save();

    // Respond with a success message
    res.status(200).json({ message: "Todo priority changed" });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with the error
    res.status(500).json({ error: error });
  }
};

// Function to get all Todos completed on a specific date
const getCompletedTodos = async (req, res) => {
  try {
    const date = req.params.date;

    // Find all Todos that are completed and fall within the specific date range
    const completedTodos = await Todo.find({
      status: "completed",
      createdAt: {
        $gte: new Date(`${date}T00:00:00.000Z`), // Start of the selected date
        $lt: new Date(`${date}T23:59:59.999Z`), // End of the selected date
      },
    }).exec();

    // Respond with the list of completed Todos
    res.status(200).json({ completedTodos });
  } catch (error) {
    // If an error occurs, respond with a generic error message
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Function to count the total number of completed and pending Todos
const countTodos = async (req, res) => {
  try {
    console.log('counting todos')
    // Count the number of completed Todos
    const totalCompletedTodos = await Todo.countDocuments({
      status: "completed",
    }).exec();

    // Count the number of pending Todos
    const totalPendingTodos = await Todo.countDocuments({
      status: "pending",
    }).exec();

    // Respond with the counts of completed and pending Todos
    res.status(200).json({ totalCompletedTodos, totalPendingTodos });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with a generic error message
    res.status(500).json({ error: 'error', error });
  }
};

// Function to delete a specific Todo
const deleteTodo = async (req, res) => {
  try {
    // Find the Todo by its ID
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      // If the Todo is not found, respond with a 404 status
      return res.status(404).json({ error: "Todo not found" });
    }

    // Delete the Todo document from the database
    await todo.deleteOne();

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Todo Deleted",
    });
  } catch (error) {
    console.log(error);
    // If an error occurs, respond with a generic error message
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Function to update the title and category of a specific Todo
const updateTodo = async (req, res) => {
  try {
    // Find the Todo by its ID
    const todo = await Todo.findById(req.params.id);
    const newTodo = req.body;
    if (!todo) {
      // If the Todo is not found, respond with a 404 status
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update the title and category of the Todo
    todo.title = newTodo.title;
    todo.category = newTodo.category;
    todo.dueDate = newTodo.dueDate;

    // Save the updated Todo document to the database
    await todo.save();

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Todo Updated",
    });
  } catch (error) {
    // If an error occurs, respond with a generic error message
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Export all the functions so they can be used in other files
module.exports = {
  addTodo,
  getUserTodos,
  toggleStatus,
  togglePriority,
  getCompletedTodos,
  countTodos,
  deleteTodo,
  updateTodo
};
