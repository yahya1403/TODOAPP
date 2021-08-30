import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';


export default function TodoItem({ data, pressHandler }) {
    const [checked, setChecked] = React.useState('');
    const [s, setS] = useState({
        textDecorationLine: 'none',
        opacity: 1,
        fontWeight: "bold"
    })
    return (<TouchableOpacity style={styles.item} >
        <RadioButton
            value="first"
            status='checked'
            status={checked === data.item.key.toString() ? 'checked' : 'unchecked'}
            onPress={() => { setS({ textDecorationLine: 'line-through', opacity: 0.5 }); setChecked(data.item.key.toString()) }}
        />
        <Text style={s}>{data.item.text}</Text>
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