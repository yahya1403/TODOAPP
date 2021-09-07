import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, SafeAreaView, ToastAndroid, Switch, StyleSheet, FlatList, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import TodoItem from './TodoItem';
import TodoTask from './TodayTask';
import Categories from './Categories';
import { useFocusEffect } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors } from 'react-native-paper';
import { db } from './config';
import { PageContext } from './PageContextProvider';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
//import firebase from 'firebase';
//import { Permissions } from 'expo';
export default function Home({ route, navigation }) {
    const registerForPushNotifications = async () => {
        try {
            const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalstatus = status;
            if (status !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalstatus = status;
            }
            if (status !== 'granted') { return; }
            let token = await Notifications.getExpoPushTokenAsync();
            //console.log(token);
            //return token;
            let uid = Math.random();
            db.ref('/todos').push({
                expotoken: token
            })
        } catch (error) {
            console.log('Error getting a token', error);
            //return error;
        }
    }
    const [todo, setTodo] = useState([]);
    const [cat, setCat] = useState([
        { text: "Business", key: 1, task: 40, size: 0.6, color: Colors.purple800 },
        { text: "Personal", key: 2, task: 18, size: 0.3, color: Colors.blue800 },
    ]);
    const [k, setK] = useState([]);
    const [enable, setEnable] = useState(false);
    const { user, toggle } = React.useContext(PageContext);
    useEffect(() => {
        //console.log(Context);
        registerForPushNotifications().then(token => { console.log(token) }).catch(error => { console.log(error) });
        getTask();


    }, []);
    async function getTask() {

        db.ref('/todoAPP').orderByChild('is_delete').equalTo(false).on('value', querySnapShot => {
            let datas = querySnapShot.val() ? querySnapShot.val() : {};
            let todoItems = { ...datas };
            (querySnapShot.val()) ? setTodo(todoItems) : ''
            setK(Object.keys(datas));
            //console.log(k);
        });
    }
    const pressHandler = (key) => {
        console.log(todo[key]);

        db.ref('/todoAPP').child(key.toString()).remove();
        ToastAndroid.show("Successfully Deleted", ToastAndroid.SHORT)
        getTask();

        // setTodo((prevTodo) => {
        //     return prevTodo.filter(todo => todo.key != key);
        // })
    }
    const submitHandler = (text) => {
        (text != '') ?
            // setTodo((prevTodo) => {
            //     return [
            //         { text: text, key: Math.random().toString() },
            //         ...prevTodo
            //     ]
            // })
            (
                db.ref('/todoAPP').push({
                    text: text,
                    is_delete: false,
                    key: Math.random().toString()
                }),
                getTask(),
                //setTodo([]),
                ToastAndroid.show("Successfully added", ToastAndroid.SHORT)
            ) : ToastAndroid.show("Please Enter the task", ToastAndroid.SHORT)
    }
    const settoggle = () => {
        toggle();
        (enable) ? setEnable(false) : setEnable(true);
        // console.log(user);
    }

    return (

        <View style={{ flex: 1, backgroundColor: user.bg }}>
            <View style={{ flex: 0.2, margin: 15, alignItems: "flex-start" }}>
                <Icon type="ionicon" onPress={() => { navigation.openDrawer() }} name="menu-sharp" color='#42a4ff' size={35} />

            </View>
            <View style={{ flex: 1, margin: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 40, color: user.color }}>What's up,Joy</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={user.enable ? "#black" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={settoggle}
                    value={enable}
                />
            </View>
            <View style={{ flex: 2, marginLeft: 15 }}>
                <Text style={{ opacity: 0.5, color: user.color }}>Categories</Text>
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
                <Text style={{ opacity: 0.5, color: user.color }}> Today Task's</Text>

                <SwipeListView
                    data={k}
                    keyExtractor={data => data}
                    renderItem={(data, rowMap, secId, rowId) => (
                        <View>
                            <TodoItem data={todo[data.item]} k={data.item} pressHandler={pressHandler} />
                        </View>

                    )}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={{ marginTop: 40, backgroundColor: user.bg, opacity: 0.5, flexDirection: "row", width: 'auto', alignItems: "center", justifyContent: 'space-around' }}>
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

