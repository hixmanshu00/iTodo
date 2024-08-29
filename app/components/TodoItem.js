import React from "react";
import { Pressable, Text, View, Image } from "react-native";
import { Entypo, Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { Swipeable } from "react-native-gesture-handler";
import styles from '../styles/home'
import { router } from "expo-router";

const TodoItem = ({ item, toggleTodo, togglePriority, renderRightActions, renderLeftActions }) => {
  return (
    <Pressable
      onPress={() => {
        router?.push({
          pathname: "/home/info",
          params: {
            id: item._id,
            title: item?.title,
            category: item?.category,
            createdAt: item?.createdAt,
            dueDate: item?.dueDate,
          },
        });
      }}
      style={styles.todoContainer}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'space-around',
          // gap: 10,
        }}
      >
        <Swipeable renderRightActions={() => renderRightActions(item?._id)} renderLeftActions={() => renderLeftActions(item?._id)} >
          <View style={{flexDirection:'row', alignItems:'center', minWidth:'90%'}}>

            <Entypo
              onPress={() => toggleTodo(item?._id)}
              name="circle"
              size={18}
              color="black"
            />
            <View style={styles.taskContainer}>
              <Text>{item?.title}</Text>
            </View>
          </View>
        </Swipeable>


        {item?.isPriority ? (
          <Ionicons
            name="flag"
            size={20}
            color="green"
            onPress={() => togglePriority(item?._id)}
          />
        ) : (
          <Feather
            name="flag"
            size={20}
            color="gray"
            onPress={() => togglePriority(item?._id)}
          />
        )}
        </View>
    </Pressable>
  );
};

export default TodoItem;
