import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {BACKEND_URL} from '@env'


// Profile component to display user profile information
const index = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [name, setName] = useState('User');
  const [email, setEmail] = useState('')

// Fetch total pending tasks and completed tasks of user
  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/countTodos`);

      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchUser = async() => {
    const userName = await AsyncStorage.getItem('userName');
    const userEmail = await AsyncStorage.getItem('userEmail');
    setName(userName);
    setEmail(userEmail);
  }

  useEffect(() => {
    fetchTaskData();
    fetchUser();
  }, []);

  const handleLogout = async () => {
    console.log('logging out');
    await AsyncStorage.removeItem('authToken');
    router.replace('/(authenticate)/login');
    console.log('logged out');
  };

  console.log(completedTasks, pendingTasks);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          source={{
            uri: "https://images.pexels.com/photos/114820/pexels-photo-114820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
        />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            Howdy, {name}
          </Text>
          <Text style={{ fontSize: 15, color: "gray", marginTop: 4 }}>
            {email}
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: 12 }}>
        <Text>Tasks Overview</Text>
        <View style={styles.innerContainer}>
          <View style={styles.innerContainer2}>
            <Text style={styles.count}>{completedTasks}</Text>
            <Text style={{ marginTop: 4 }}>completed tasks</Text>
          </View>

          <View style={styles.innerContainer2}>
            <Text style={styles.count}>{pendingTasks}</Text>
            <Text style={{ marginTop: 4 }}>pending tasks</Text>
          </View>
        </View>
      </View>

      <LineChart
        data={{
          labels: ["Pending Tasks", "Completed Tasks"],
          datasets: [
            {
              data: [pendingTasks, completedTasks],
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={2} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />



      <View
        style={{
          // justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          maxHeight: '40%'
        }}
      >
        <Image
          style={{ width: '90%', height: '80%' }}
          source={{
            uri: "https://images.pexels.com/photos/3831847/pexels-photo-3831847.jpeg",
          }}
        />
      </View>

      <Pressable style={styles.logout} onPress={handleLogout}>
        <Text style={{ textAlign: "center", color: "white" }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginVertical: 8,
  },
  innerContainer2: {
    backgroundColor: "#89CFF0",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextDays: {
    backgroundColor: "#89CFF0",
    padding: 10,
    borderRadius: 6,
    marginTop: 15,
  },

  logout: {
    backgroundColor: "#eb4634",
    padding: 10,
    borderRadius: 6,
    // marginTop: '10%',
  }
});
