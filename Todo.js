import {TouchableOpacity, Text, View} from "react-native";
import firestore from "@react-native-firebase/firestore";
import {List} from "react-native-paper";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

const Todo = ({id, title, complete}) => {
  async function toggleComplete() {
    await firestore().collection("todos").doc(id).update({complete: !complete});
  }

  async function handleDelete() {
    await firestore()
      .collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Todo deleted!");
      });
  }
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        alignItems: "center",
      }}>
      <TouchableOpacity
        onPress={() => toggleComplete()}
        style={{flexDirection: "row", padding: 10}}>
        <Icon name={complete ? "checkcircleo" : "minuscircleo"} size={30} color="#4E8ef7" />
      </TouchableOpacity>
      <View style={{padding: 10}}>
        <Text>{title}</Text>
      </View>
      {/* <List.Item
        title={title}
        onPress={() => toggleComplete()}
        left={props => <List.Icon {...props} icon={complete ? "check" : "cancel"} />}
    /> */}
      <Text onPress={handleDelete}>
        <Icon name="closecircleo" size={30} color="red" />
      </Text>
    </View>
  );
};

export default React.memo(Todo);
