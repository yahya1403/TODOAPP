import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Todo from './Todo';
import { data } from './data';
const Stack = createStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerMode: 'none',
        navigationOptions: {
          headerVisible: false,
        }
      }}
        screenListeners={{
          state: (e) => {
            const intervalId = setInterval(() => {
              if (data.value < 85) {
                data.value = 85;
              }
            }, 1500);
            return () => clearInterval(intervalId);

          },
        }}
      >
        <Stack.Screen name="Todo" component={Todo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
