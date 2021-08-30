import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import TodoItem from './TodoItem';
import TodoTask from './TodayTask';
import Categories from './Categories';
import { useFocusEffect } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors } from 'react-native-paper';
export default function Home({ route, navigation }) {
    const [todo, setTodo] = useState([
        { text: "task 1", key: 1 },
        { text: "task 2", key: 2 },
        { text: "task 3", key: 3 },
    ]);
    const [cat, setCat] = useState([
        { text: "Business", key: 1, task: 40, size: 0.6, color: Colors.purple800 },
        { text: "Personal", key: 2, task: 18, size: 0.3, color: Colors.blue800 },
    ]);
    const pressHandler = (key) => {
        setTodo((prevTodo) => {
            return prevTodo.filter(todo => todo.key != key);
        })
    }
    const submitHandler = (text) => {
        (text != '') ?
            setTodo((prevTodo) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevTodo
                ]
            }) : ''
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.2, margin: 15, alignItems: "flex-start" }}>
                <Icon type="ionicon" onPress={() => { navigation.openDrawer() }} name="menu-sharp" color='#42a4ff' size={35} />

            </View>
            <View style={{ flex: 1, margin: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 40 }}>What's up,Joy</Text>

            </View>
            <View style={{ flex: 2, marginLeft: 15 }}>
                <Text style={{ opacity: 0.5 }}>Categories</Text>
                <View>

                    <FlatList data={cat}
                        horizontal={true}
                        keyExtractor={(item) => item.key.toString()}
                        renderItem={({ item }) => (
                            <Categories item={item} />
                        )}
                    />

                </View>
            </View>
            <View style={{ flex: 3, marginLeft: 15, marginRight: 15 }}>
                <Text style={{ opacity: 0.5 }}> Today Task's</Text>
                <SwipeListView
                    data={todo}
                    keyExtractor={data => data.key.toString()}
                    renderItem={(data, rowMap, secId, rowId) => (
                        <View>
                            <TodoItem data={data} pressHandler={pressHandler} />
                        </View>

                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={{ marginTop: 20, opacity: 0.5, flexDirection: "row", width: 'auto', alignItems: "space-around", justifyContent: 'space-around' }}>
                            <Text style={{ color: 'tomato' }}>This row has been deleted</Text>
                            <Text>UNDO</Text>
                        </View>
                    )}
                    rightOpenValue={-300}
                    onRowDidOpen={(data, rowMap) => {
                        // let k = rowMap[data].props.children[0]['props'].children._owner.key;
                        let k = rowMap[data].props.children[0]['props'].children[0]['_owner'].key;
                        pressHandler(k);
                    }}
                    previewFirstRow={true}
                    disableRightSwipe
                />
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <View style={{ position: 'absolute', zIndex: 1 }}>
                    <Icon
                        type="ionicon"
                        name="add-circle"
                        onPress={() => navigation.navigate('TodayTask', { onSelect: submitHandler })}
                        color='#009df2'
                        size={70}
                    /></View>
            </View>
        </View>
    );
}

