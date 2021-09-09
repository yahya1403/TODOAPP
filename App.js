import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Todo from './Todo';
import { data } from './data';
import PageContextProvider from './PageContextProvider';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
const Stack = createStackNavigator();
//const Context = React.createContext('light');
const INCREAMENT = "INCREAMENT";
const DECRAEMENT = "DECRAEMENT";

export const increament = () => ({ type: INCREAMENT });
export const decreament = () => ({ type: DECRAEMENT });


const counterReducer = (state, actions) => {
  switch (actions.type) {
    case "INCREAMENT":
      return state += 1;
    case "DECRAEMENT":
      return state -= 1;
    default:
      return state = 0;
  }

}
let store = createStore(counterReducer);
//store.subscribe(() => console.log("s" + store.getState()))
//store.dispatch(increament());
function App() {

  return (

    <PageContextProvider>
      <Provider store={store}>
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
      </Provider>
    </PageContextProvider>

  );
}
export default App;
