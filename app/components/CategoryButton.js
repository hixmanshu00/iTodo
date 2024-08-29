import React from "react";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import styles from '../styles/home'

const CategoryButtons = ({ category, handleCategory, setIsVisible, isVisible }) => {
  return (
    <View style={styles.container}>
    <Pressable
      style={[styles.pressable, category === "All" ? styles.active : ""]}
      onPress={() => handleCategory("All")}
    >
      <Text>All</Text>
    </Pressable>
    <Pressable
      style={[styles.pressable, category === "Work" ? styles.active : ""]}
      onPress={() => handleCategory("Work")}
    >
      <Text>Work</Text>
    </Pressable>

    <Pressable
      style={[
        styles.pressable,
        category === "Personal" ? styles.active : "",
      ]}
      onPress={() => handleCategory("Personal")}
    >
      <Text>Personal</Text>
    </Pressable>

    <Pressable
      style={[
        styles.pressable,
        category === "Wishlist" ? styles.active : "",
      ]}
      onPress={() => handleCategory("Wishlist")}
    >
      <Text>Wishlist</Text>
    </Pressable>
    <Pressable onPress={() => setIsVisible(!isVisible)}>
      <AntDesign name="pluscircle" size={30} color="#007FFF" />
    </Pressable>
  </View>
  );
};

export default CategoryButtons;
