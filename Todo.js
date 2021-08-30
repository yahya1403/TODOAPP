import React, { useEffect, useRef } from 'react';
import { useFocusEffect, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, useDrawerStatus, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { ScrollView, TextInput, Animated, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Text, View, Image, Button } from 'react-native';
//import StackTodo from './StackTodo';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import Home from './Home';
import Workout from './Workout';
import TodayTask from './TodayTask';
import ProgressCircle from 'react-native-progress-circle';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-svg';
import { data } from './data';
import LiquidProgress from "react-native-liquid-progress";



const Drawer = createDrawerNavigator();
const list = [
    {
        name: 'Templates',
        icon_url: 'image',

    },
    {
        name: 'Categories',
        icon_url: 'address-card',

    },
    {
        name: 'Analysis',
        icon_url: 'chart-pie',

    },
    {
        name: 'Settings',
        icon_url: 'cogs',

    }

];


function CustomDrawerContent(props) {

    const isDrawerOpen = useDrawerStatus() === 'open';
    useEffect(() => {
        // const d = props.navigation.addListener('drawerOpen', (e) => {
        console.log('Open');
        //  });

    }, []);
    useFocusEffect(React.useCallback(() => {
    }, []));

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, alignItems: "flex-end" }}><Icon
                    name='chevron-back-circle-outline'
                    type='ionicon'
                    color='#fff'
                    size={35}
                    onPress={() => { data.value = 0; props.navigation.closeDrawer(); }}
                /></View>
                <View style={{ flex: 1, height: 180, alignItems: "center", justifyContent: "center" }}>
                    <AnimatedCircularProgress
                        size={100}
                        width={3}
                        fill={data.value}
                        tintColor="purple"
                        backgroundColor="#3d5875"
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                    >
                        {
                            (fill) => (
                                <Image
                                    style={{ height: 100, width: 100 }}
                                    source={{
                                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSnCsUIrk0Hf-i-Rkqq_CU29A_YQRaGBEYBw&usqp=CAU',
                                    }}
                                />

                            )
                        }

                    </AnimatedCircularProgress>
                </View>
                <View style={{ flex: 1, alignItems: "center", height: 50, justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 30 }}>Joy Mitchell</Text>
                </View>
                <View style={{ flex: 1, height: 270, justifyContent: "center" }}>

                    <FlatList
                        data={list}
                        renderItem={({ item, index, separators }) => (
                            <TouchableOpacity
                                key={item.key}
                                onPress={() => { console.log(item) }}>
                                <View style={{ flexDirection: "row", alignItems: "center", height: 50, justifyContent: "center" }}>
                                    <Avatar icon={{ name: item.icon_url, size: 20, color: '#94908f', type: 'font-awesome-5' }} />
                                    <Text onPress={() => { props.navigation.navigate('Workout') }} style={{ color: "#94908f", padding: 10, fontSize: 20 }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    {/* <LiquidProgress
                        frontWaveColor={"purple"}
                        backWaveColor={"white"}
                        fill={0.3161836486693635}
                        size={150}
                    /> */}
                </View>
                <View style={{ flex: 1, alignItems: "center", height: 50, }}>

                    <Text style={{ color: "white", fontSize: 15 }}>Consistency</Text></View>
                {/* <View style={{ display: "none" }}>
                    <DrawerItemList {...props} />
                </View> */}

            </View >
        </DrawerContentScrollView >

    );
}

export default function Todo({ navigation }) {

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
            drawerStyle: {
                backgroundColor: '#231840',
            },
        }}>
            <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Drawer.Screen name="Workout" component={Workout} options={{ headerShown: false }} />
            <Drawer.Screen name="TodayTask" component={TodayTask} options={{ headerShown: false }} />
        </Drawer.Navigator>

    );
}


