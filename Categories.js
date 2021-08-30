import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
export default function Categories({ item }) {
    const useProgress = (Size = item.size) => {
        const [progress, setProgress] = useState(0);
        useEffect(() => {
            const intervalId = setInterval(() => {
                if (progress < Size) {
                    setProgress(Size);
                }
            }, 1500);
            return () => clearInterval(intervalId);
        }, []);
        return progress;
    };
    const progress = useProgress();
    return (<TouchableOpacity style={styles.item}>
        <Animated.View>
            <Text style={{ opacity: 0.5 }}>{item.task} Tasks</Text>
            <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: "bold" }}>{item.text}</Text>
            <ProgressBar progress={progress} color={item.color} height={7} />
        </Animated.View>
    </TouchableOpacity>);
}


const styles = StyleSheet.create({
    item: {
        padding: 16,
        margin: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        width: 180,
        height: 100,
        backgroundColor: "white"
    }
});