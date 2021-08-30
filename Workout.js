import React, { useEffect, useRef, useState } from 'react';
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { View, Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Workout() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const data = [10, 50, 40, 95, 4, 124, 85, 251, 35, 153];
    const heights = [new Animated.Value(10), new Animated.Value(20), new Animated.Value(30)];
    const value = useRef(new Animated.Value(0)).current;
    const r = (data) ? <LineChart
        style={{ height: 100 }}
        data={data}
        gridMin={0}
        curve={shape.curveNatural}
        contentInset={{ top: 10, bottom: 10 }}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
    /> : <Text>hi</Text>;
    useEffect(() => {
        // Animated.timing(fadeAnim, {
        //     toValue: 40,
        //     duration: 2000,
        //     //useNativeDriver: false
        // }).start(() => { for (let i = 0; i < 5; i++) { data.push(Math.random() + i); } console.log(data) });
        // Animated.parallel([
        //     Animated.timing(heights[0], { toValue: 20, duration: 2000, useNativeDriver: true }),
        //     Animated.timing(heights[1], { toValue: 30, duration: 2000, useNativeDriver: true }),
        //     Animated.timing(heights[2], { toValue: 40, duration: 2000, useNativeDriver: true })
        // ]).start()
        const intervalId = setInterval(() => {
            if (data.length > 15) {
                clearInterval(intervalId);
            }
            data.push(85);
            // console.log(data)
        }, 1500);
    }, [data])
    return (<Animated.View style={{ flex: 1, alignItem: "center", justifyContent: "center" }}>
        {r}


        <TouchableOpacity style={[
            styles.fadingContainer,
            {
                // Bind opacity to animated value
                padding: fadeAnim
            }
        ]}>
            <Text >HI</Text></TouchableOpacity>
        <Text>hi</Text>
    </Animated.View>)

}
const styles = StyleSheet.create({

    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue"
    }
});
