import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {BACKEND_URL} from '@env'
import { StatusBar } from "expo-status-bar";


const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleRegister = async () => {
    const user = {
      name,
      email,
      password,
    };

    console.log(password)

    await axios
      .post(`${BACKEND_URL}/users/register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setPassword("");
        setEmail("");
        setName("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "an error occured during registration"
        );
        console.log(error.message);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ marginTop: 100 }}>
        <Text style={styles.heading}>iTodo</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.para}>Register to your account</Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={styles.inputContainer}>
            <Ionicons
              style={{ marginLeft: 8 }}
              name="person"
              size={24}
              color="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View style={{ marginTop: 60 }} />

          <Pressable style={styles.login} onPress={handleRegister}>
            <Text style={styles.loginText}>Register</Text>
          </Pressable>

          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.signup}>Already have an account? Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0066b2",
  },
  para: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
  },
  login: {
    width: 200,
    backgroundColor: "#6699CC",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signup: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
  },
});
