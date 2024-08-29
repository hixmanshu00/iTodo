import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styles from "../../styles/home";
import {
  addTask,
  deleteTask,
  getUserTasks,
  toggleTask,
  toggleTaskPriority,
} from "../../api";
import CategoryButtons from "../../components/CategoryButton";
import Modal from "../../components/BottomModal";
import TodoItem from "../../components/TodoItem";
import { handleTaskCategory } from "../../utils";
import { StatusBar } from "expo-status-bar";

const index = () => {
  // State variables for managing various task-related data
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("");
  const [todo, setTodo] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [category, setCategory] = useState("All");
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [marked, setMarked] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [sortCriterion, setSortCriterion] = useState("dueDate");
  const today = moment().format("MMM Do");
  const router = useRouter();

  // Function to handle sorting tasks based on the selected criterion
  const handleSortChange = (criterion) => {
    setSortCriterion(criterion);
  };

  // Fetch the logged-in user's ID from AsyncStorage
  const getUserId = async () => {
    const userID = await AsyncStorage.getItem("userId");
    setUserId(userID);
    console.log("user logged in: ", userID);
  };

  // Delete a todo item by its ID
  const deleteTodo = async (id) => {
    await deleteTask(id);
    await getUserTodos();
  };

  // Add a new todo item
  const addTodo = async () => {
    await addTask(todo, category, dueDate, setIsVisible, setTodo, userId, setCategory);
    await getUserTodos();
  };

  // Effect hook to initialize user ID and fetch todos on component mount
  useEffect(() => {
    getUserId();
    getUserTodos();
    console.log("first");
  }, [marked, isVisible, sortCriterion]);

  // Fetch todos for the user based on the selected sort criterion
  const getUserTodos = async () => {
    await getUserTasks(
      setTodos,
      setPendingTodos,
      setCompletedTodos,
      sortCriterion
    );
  };

  // Toggle the completion status of a todo item
  const toggleTodo = async (todoId) => {
    await toggleTask(todoId, setMarked);
    await getUserTodos();
  };

  // Handle task filtering based on the selected category
  const handleCategory = (category) => {
    handleTaskCategory(
      category,
      setCategory,
      setPendingTodos,
      setCompletedTodos,
      todos
    );
  };

  // Toggle the priority of a todo item
  const togglePriority = async (todoId) => {
    await toggleTaskPriority(todoId);
    await getUserTodos();
  };

  // Handle date change in the date picker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDueDate(currentDate);
  };

  // Display the date picker
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

const showDatepicker = () => {
    showMode("date");
    // console.log(dueDate)
  };

  const pickerRef = useRef();

  function open() {
    setIsOpen(true);
    pickerRef.current.focus();
  }

  const [isOpen, setIsOpen] = useState(false);

  // Render the delete button for a todo item
  const renderRightActions = (id) => (
    <Pressable style={styles.deleteButton} onPress={() => deleteTodo(id)}>
      <MaterialIcons name="delete" size={24} color="white" />
    </Pressable>
  );

  const renderLeftActions = (id) => (
    <Pressable style={styles.doneButton} onPress={() => toggleTodo(id)}>
      <MaterialIcons name="done" size={24} color="white" />
    </Pressable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <CategoryButtons
        category={category}
        handleCategory={handleCategory}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
      />

      <ScrollView style={styles.scrollView}>
        <View style={{ padding: 10 }}>
          {todos?.length > 0 ? (
            <View>
              {/* Display message if no tasks are available in the selected category */}
              {pendingTodos.length === 0 && completedTodos.length === 0 && (
                <Text style={{ margin: "auto", marginVertical: "60%" }}>
                  No tasks in {category} category{" "}
                </Text>
              )}
              {/* Display pending tasks if available */}
              {pendingTodos?.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Tasks to Do! {today}</Text>
                  <MaterialIcons
                    name="sort"
                    size={24}
                    color="black"
                    onPress={open}
                  />
                  {/* Dropdown for sorting tasks */}
                  <Picker
                    ref={pickerRef}
                    style={{ position: "absolute" }}
                    onValueChange={(itemValue) => handleSortChange(itemValue)}
                  >
                    <Picker.Item label="Sort by Due Date" value="dueDate" />
                    <Picker.Item label="Sort by Created At" value="createdAt" />
                    <Picker.Item label="Sort by Priority" value="isPriority" />
                  </Picker>
                </View>
              )}

              {/* Render each pending task */}
              {pendingTodos?.map((item, index) => {
                return (
                  <TodoItem key={index} item={item} toggleTodo={toggleTodo} togglePriority={togglePriority} deleteTodo={deleteTodo} renderRightActions={renderRightActions} renderLeftActions={renderLeftActions} />
                );
              })}

              {/* Display completed tasks if available */}
              {completedTodos?.length > 0 && (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <Image
                      style={{ width: 100, height: 100 }}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/6784/6784655.png",
                      }}
                    />
                  </View>

                  <View style={styles.completedContainer}>
                    <Text>Completed Tasks</Text>
                    <MaterialIcons
                      name="arrow-drop-down"
                      size={24}
                      color="black"
                    />
                  </View>

                  {/* Render each completed task */}
                  {completedTodos?.map((item, index) => {
                    return (
                      <Pressable style={styles.todoContainer} key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <FontAwesome name="circle" size={18} color="gray" />
                          <Text
                            style={{
                              flex: 1,
                              textDecorationLine: "line-through",
                              color: "gray",
                            }}
                            onPress={() => toggleTodo(item._id)}
                          >
                            {item?.title}
                          </Text>
                          <Pressable onPress={() => deleteTodo(item._id)}>
                            <MaterialIcons
                              name="delete"
                              size={24}
                              color="red"
                            />
                          </Pressable>
                          {item?.isPriority ? (
                            <Ionicons name="flag" size={20} color="green" />
                          ) : (
                            <Feather name="flag" size={20} color="gray" />
                          )}
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.noTaskContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
                }}
              />
              <Text style={styles.noTaskText}>
                No Tasks for today! add a task
              </Text>
              <Pressable
                onPress={() => setIsVisible(!isVisible)}
                style={{ marginTop: 15 }}
              >
                <AntDesign name="pluscircle" size={30} color="#007FFF" />
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal for adding a new todo */}
      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        dueDate={dueDate}
        showDatepicker={showDatepicker}
        setCategory={setCategory}
        show={show}
        onChange={onChange}
      />
    </GestureHandlerRootView>
  );
};

export default index;
