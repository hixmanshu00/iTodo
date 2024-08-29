import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { sortTasks } from "../utils";
import {BACKEND_URL} from '@env'


// api to delete a todo
export const deleteTask = async (id) => {
    try {
      console.log("deleting todo");
      const response = await axios.delete(
        `${BACKEND_URL}/todos/${id}`
      );
      Alert.alert("Todo deleted");
      await getUserTodos();
    } catch (error) {
      console.log(error);
    }
  };

// api to add a todo
  export const addTask = async (todo, category, dueDate, setIsVisible, setTodo, userId, setCategory) => {
    console.log("adding todo");
    try {
      const todoData = {
        title: todo,
        category: category,
        dueDate,
      };

      const response = await axios.post(
        `${BACKEND_URL}/todos/${userId}`,
        todoData
      );

      // console.log(response);
      setIsVisible(false);
      setTodo("");
      setCategory('All')
    } catch (error) {
      console.log("error", error);
    }
  };

// api to get user all todos
  export const getUserTasks = async (setTodos, setPendingTodos, setCompletedTodos, sortCriterion) => {
    try {
      const userID = await AsyncStorage.getItem("userId");
      console.log("third", userID);
      const response = await axios.get(
        `${BACKEND_URL}/todos/${userID}`
      );
      // console.log(response.data.todos);
      setTodos(response.data.todos);

      const fetchedTodos = response.data.todos || [];

      const pendingTasks = fetchedTodos.filter(
        (todo) => todo.status !== "completed"
      );
      const completed = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );

      setPendingTodos(sortTasks(pendingTasks, sortCriterion));
      setCompletedTodos(completed);
    } catch (error) {
      console.log("error", error);
    }
  };

//   api to toggle complete/pending status of a todo
  export const toggleTask = async (todoId, setMarked) => {
    try {
      setMarked(true);
      const response = await axios.patch(
        `${BACKEND_URL}/todos/${todoId}/toggleStatus`
      );
    } catch (error) {
      console.log("error", error);
    }
  };



// api to toggle task priority
export const toggleTaskPriority = async (todoId) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/todos/${todoId}/togglePriority`
      );
    } catch (error) {
      console.log("error", error);
    }
  };