import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Pressable, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text, View, Image, Button } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PageContext } from './PageContextProvider';

export default function TodayTask({ route, navigation }) {
    const [text, setText] = useState('');
    const onChangeText = (val) => {
        setText(val);
    }
    const { user, toggle } = React.useContext(PageContext);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: user.bg }}>

            <View style={{ flex: 1, alignItems: "flex-end" }}>
                <View style={{ borderRadius: 60, borderWidth: 0.5, margin: 10 }}>
                    <Icon
                        type="ionicon"
                        name="close-outline"
                        onPress={() => navigation.navigate('Home')}
                        color={user.color}
                        size={40}
                    /></View>
            </View>
            <View style={{ flex: 1 }}>

                <TextInput id="input" placeholder="Enter Your task" value={text} onChangeText={onChangeText} style={[styles.input, { borderBottomColor: user.color, borderBottomWidth: 1 }]} />

                <View style={{ flexDirection: "row", margin: 20 }}>
                    <Pressable style={{ width: 120, borderWidth: 1, opacity: 0.5, alignItems: "center", justifyContent: "space-around", borderRadius: 60, flexDirection: "row" }} onPress={() => { console.log("hii") }}>

                        <Icon type="ionicon" name="calendar-outline" color={user.color} size={25} />
                        <Text style={{ fontSize: 25, color: user.color }}>Today</Text>
                    </Pressable>
                    <Pressable style={{ borderRadius: 60, borderWidth: 1, marginLeft: 10 }}>
                        <Icon type="ionicon" name="ellipse" color='#42a4ff' size={30} />
                    </Pressable>
                </View>

            </View>
            <View style={{ flex: 0.5, justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ width: 150, opacity: 0.5, flexDirection: "row", justifyContent: "space-between" }}>
                    <Icon type="ionicon" name="folder-outline" color={user.color} size={30} />
                    <Icon type="ionicon" name="flag-outline" color={user.color} size={30} />
                    <Icon type="ionicon" name="moon-outline" color={user.color} size={30} />
                </View>
            </View>
            <View style={{ flex: 0.5, justifyContent: "flex-start", alignItems: "flex-end", margin: 10 }}>
                <TouchableOpacity onPress={() => {
                    route.params.onSelect(text);
                    navigation.goBack();
                    setText('');
                }} style={[styles.button, { justifyContent: "space-around", flexDirection: "row", backgroundColor: "#202de6", alignItems: "center", width: 180, height: 50 }]}><Text style={{ color: "#fff" }}>New Task</Text><Text><Icon type="ionicon" name="chevron-down-outline" color='#fff' size={30} /></Text></TouchableOpacity>
            </View>


        </SafeAreaView>

    );
}
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width: 250,
        padding: 10,

    },
    button: {
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});