import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    BottomModal,
    ModalContent,
    ModalTitle,
    SlideAnimation,
  } from "react-native-modals";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { suggestions } from "../data";
import moment from "moment";

const Modal = ({isVisible, todo, setIsVisible, addTodo, category, showDatepicker, dueDate, show, setCategory, setTodo,mode, onChange }) => {
  return (
      <BottomModal
        onHardwareBackPress={() => setIsVisible(!isVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={20}
        modalTitle={<ModalTitle title="Add a todo" />}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        visible={isVisible}
        onTouchOutside={() => setIsVisible(!isVisible)}
      >
        <ModalContent style={{ width: "100%", height: 380 }}>
          <View style={styles.inputContainer}>
            <TextInput
              value={todo}
              onChangeText={(text) => setTodo(text)}
              placeholder="Input a new task here"
              style={styles.inputText}
            />
            <Pressable onPress={addTodo}>
              <Ionicons name="send" size={24} color="#007FFF" />
            </Pressable>
          </View>

          <Text>Choose Category</Text>

          <View style={styles.categoryContainer}>
            <Pressable
              style={[
                styles.categoryBtn,
                category === "Work" ? styles.active : "",
              ]}
              onPress={() => setCategory("Work")}
            >
              <Text>Work</Text>
            </Pressable>

            <Pressable
              style={[
                styles.categoryBtn,
                category === "Personal" ? styles.active : "",
              ]}
              onPress={() => setCategory("Personal")}
            >
              <Text>Personal</Text>
            </Pressable>

            <Pressable
              style={[
                styles.categoryBtn,
                category === "Wishlist" ? styles.active : "",
              ]}
              onPress={() => setCategory("Wishlist")}
            >
              <Text>Wishlist</Text>
            </Pressable>
          </View>

          <Text>Due Date</Text>
          <Pressable onPress={showDatepicker} style={styles.dateButton}>
            <Text>{moment(dueDate).format("DD MMMM")}</Text>
          </Pressable>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <Text>Some suggestion</Text>
          <View style={styles.suggestionsContainer}>
            {suggestions?.map((item, index) => (
              <Pressable
                key={index}
                style={styles.suggestions}
                onPress={() => setTodo(item.todo)}
              >
                <Text style={{ textAlign: "center" }}>{item?.todo}</Text>
              </Pressable>
            ))}
          </View>
        </ModalContent>
      </BottomModal>
  );
};

export default Modal;
