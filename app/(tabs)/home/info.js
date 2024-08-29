import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { BottomModal, ModalContent, ModalTitle, SlideAnimation } from "react-native-modals";
import axios from "axios";
import { suggestions } from "../../data";
import Modal from "../../components/BottomModal";
import moment from "moment";


const info = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [category, setCategory] = useState('')
  const [todo, setTodo] = useState('')
  const [dueDate, setDueDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const params = useLocalSearchParams();
  const handleBack = () => {
    router.replace("/(tabs)/home");
  }

  const handleEdit = () => {
    setTodo(params?.title);
    setCategory(params?.category);
    setDueDate(params?.dueDate);
    setIsVisible(true)
  }

  const editTodo = async () => {

    const newTodo = {
      title: todo,
      category,
      dueDate
    }
    try {
      const response = await axios.put(
        `http://192.168.0.128:5000/todos/${params?.id}`, newTodo
      );
      Alert.alert("Todo updated");
      handleBack();
    } catch (error) {
      console.log('error', error);
    }
  }

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
    console.log(dueDate)

    };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" onPress={handleBack} />
        <Entypo name="dots-three-vertical" size={24} color="black" />
      </View>

      <View onMagicTap={5}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          Category - {params?.category}
        </Text>
      </View>

      <Text style={{ marginTop: 20, fontSize: 17, fontWeight: "600" }}>
        {params?.title}
      </Text>

      <View style={{ marginTop: 50 }} />

      <Pressable onPress={handleEdit} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialIcons name="edit-note" size={24} color="#7CB9E8" />
        <Text style={{ color: "#7CB9E8", fontSize: 16, fontWeight: "500" }}>
          Edit Todo
        </Text>
      </Pressable>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text>Due Date</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#7CB9E8", padding: 7, borderRadius: 6 }}
          >
            <Text>{moment(params?.dueDate).format("DD MMMM")}</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Ionicons name="time-sharp" size={24} color="gray" />
            <Text>Time and Reminder</Text>
          </View>

          <Pressable
            style={{ backgroundColor: "#7CB9E8", padding: 7, borderRadius: 6 }}
          >
            <Text>No</Text>
          </Pressable>
        </View>
      </View>

      {/* <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <Feather name="repeat" size={24} color="black" />
            <Text>Repeat Task</Text>
          </View>

          <Pressable style={{backgroundColor: '#7CB9E8', padding:7, borderRadius: 6}}>
            <Text>{dueDate}</Text>
          </Pressable>
        </View>
      </View> */}

      <View style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
            <SimpleLineIcons name="note" size={24} color="black" />
            <Text>Notes</Text>
          </View>

          <Pressable style={{backgroundColor: '#7CB9E8', padding:7, borderRadius: 6}}>
            <Text>Not added</Text>
          </Pressable>
        </View>
      </View>

      <Modal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        todo={todo}
        setTodo={setTodo}
        addTodo={editTodo}
        dueDate={dueDate}
        showDatepicker={showDatepicker}
        setCategory={setCategory}
        show={show}
        onChange={onChange}
        category={category}
      />
    </View>
  );
};

export default info;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  categoryBtn: {
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },
  active: {
    backgroundColor: "#7CB9E8",
  },
  suggestions: {
    backgroundColor: "#F0F8FF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
  },
  suggestionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
    marginVertical: 10,
  },
  inputText: {
    padding: 10,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
  },
});
