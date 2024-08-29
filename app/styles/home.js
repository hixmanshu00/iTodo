import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    pressable: {
      backgroundColor: "#F0F8FF",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      marginRight: "auto",
    },
    container: {
      marginHorizontal: 10,
      marginVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    scrollView: {
      flex: 1,
      backgroundColor: "#fff",
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: "contain",
    },
    noTaskText: {
      fontSize: 16,
      marginTop: 15,
      fontWeight: "600",
      textAlign: "center",
    },
    noTaskContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 130,
      marginLeft: "auto",
      marginRight: "auto",
    },
    inputText: {
      padding: 10,
      borderColor: "#E0E0E0",
      borderWidth: 1,
      borderRadius: 5,
      flex: 1,
    },
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
    todoContainer: {
      backgroundColor: "#EOEOEO",
      paddingHorizontal: 10,
      borderRadius: 7,
      marginVertical: 10,
    },
    completedContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      marginVertical: 10,
    },
    dateButton: {
      padding: 10,
      backgroundColor: "#eee",
      borderRadius: 5,
      alignItems: "center",
      marginVertical: 10,
    },
    taskContainer: {
      padding: 16,
      paddingHorizontal: 16,
      backgroundColor: "#0000",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
  
    },
    deleteButton: {
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      width: '50%',
      height: "100%",
    },
    doneButton: {
      backgroundColor: "#14cf0a",
      justifyContent: "center",
      alignItems: "center",
      width: '50%',
      height: "100%",
    },
  });
  