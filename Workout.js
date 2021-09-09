import React, { useEffect, useRef, useState } from 'react';
import { AreaChart, Grid, LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { View, Animated, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increament, decreament } from './App'


export default function Workout() {
    const counter = useSelector(state => state);
    const dispatch = useDispatch();

    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
            onPress={() => dispatch(increament())}
            title="Increament"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        <Text>{counter}</Text>
        <Button
            onPress={() => dispatch(decreament())}
            title="Decreament"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />

    </View>)

}


