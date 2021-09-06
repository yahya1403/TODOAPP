import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { db } from './config';

export default function TodoItem({ data, k, pressHandler }) {
    //const [todo, setTodo] = useState([]);
    const [checked, setChecked] = React.useState('');
    const [s, setS] = useState({
        textDecorationLine: 'none',
        opacity: 1,
        fontWeight: "bold"
    })
    // useEffect(() => {

    //     getTask();
    //     //console.log("data");
    //     //console.log(todo[data.item].key);
    // }, []);
    // async function getTask() {
    //     db.ref('/todoAPP').on('value', querySnapShot => {
    //         let datas = querySnapShot.val() ? querySnapShot.val() : {};
    //         let todoItems = { ...datas };
    //         (querySnapShot.val()) ? setTodo(todoItems) : ''
    //     });

    // }
    return (<TouchableOpacity style={styles.item} >
        <RadioButton
            value="first"
            status='checked'
            status={checked === k ? 'checked' : 'unchecked'}
            onPress={() => { setS({ textDecorationLine: 'line-through', opacity: 0.5 }); setChecked(k.toString()) }}
        />
        <Text style={s}>{data.text}</Text>
    </TouchableOpacity>);
}

//pressHandler(item.key)
const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: 'baseline',
        backgroundColor: "white"
    }
});