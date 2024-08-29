const express = require("express");
const {
  addTodo,
  getUserTodos,
  toggleStatus,
  togglePriority,
  getCompletedTodos,
  countTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo");

const router = express.Router();

// Route to add a new todo for a specific user
router.post("/:userId", addTodo);

// Route to get all todos for a specific user
router.get("/:userId", getUserTodos);

// Route to toggle the status (completed/pending) of a specific todo
router.patch("/:todoId/toggleStatus", toggleStatus);

// Route to toggle the priority of a specific todo
router.patch("/:todoId/togglePriority", togglePriority);

// Route to get all completed todos for a specific date
router.get("/completed/:date", getCompletedTodos);

// Route to get the count of completed and pending todos
router.get("/countTodos", countTodos);

// Route to delete a specific todo
router.delete("/:id", deleteTodo);

// Route to update a specific todo
router.put("/:id", updateTodo);

module.exports = router;
