import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from 'jwt-decode'
import {BACKEND_URL} from '@env'
import { StatusBar } from "expo-status-bar";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userId = await AsyncStorage.getItem('userId');
        if (token&&userId) {
          router.replace("/(tabs)/home");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []);
  const handleLogin = async () => {
    console.log(BACKEND_URL)
    const user = {
      email,
      password,
    };
    try {
        axios.post(`${BACKEND_URL}/users/login`, user).then(async (response) => {
        const token = response.data.token;
        await AsyncStorage.setItem("authToken", token);
        const userId = jwtDecode(token).userId;
        const userEmail = jwtDecode(token).userEmail;
        const userName = jwtDecode(token).userName;
        console.log('userid',userId);
        await AsyncStorage.setItem("userId", userId);
        await AsyncStorage.setItem("userName", userEmail);
        await AsyncStorage.setItem("userEmail", userName);
        router.replace("/(tabs)/home");
      });
      console.log('logged in');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={{ marginTop: 100 }}>
        <Text style={styles.heading}>iTodo</Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.para}>Log in to your account</Text>
        </View>

        <View style={{ marginTop: 70 }}>
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

          <View style={styles.optionsContainer}>
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
              Forgot Password?
            </Text>
          </View>

          <View style={{ marginTop: 60 }} />

          <Pressable style={styles.login} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>

          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => router.replace("/register")}
          >
            <Text style={styles.signup}>Don't have an account? Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

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
