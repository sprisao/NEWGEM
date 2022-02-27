import {StyleSheet, Text, View, ScrollView, Button, TextInput, SafeAreaView} from "react-native";
import React, {useState, useEffect} from "react";

import firestore from "@react-native-firebase/firestore";
import {FlatList} from "react-native-gesture-handler";
import Todo from "../Todo";

const FireStoreTest = () => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  const ref = firestore().collection("todos");

  const users = firestore().collection("users").get();

  async function addTodo() {
    // Adding new Todos //
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo("");
  }

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
      // TODO
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Todo {...item} />}
        />
      </View>
      <TextInput
        label={"New Todo"}
        placeholder="useless placeholder"
        value={todo}
        autoFocus={true}
        onChangeText={setTodo}
      />
      <Button onPress={() => addTodo()} title="Add Todo"></Button>
    </SafeAreaView>
  );
};

export default FireStoreTest;

const styles = StyleSheet.create({});
