import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddContact from '../screens/AddContact';
import Home from '../screens/Home';
import DetailContact from '../screens/DetailContact';

const Stack = createStackNavigator();
export default function Navigation() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator mode='modal'>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
            <Stack.Screen
            name="addContact"
            component={AddContact}
          />
            <Stack.Screen
            name="detailContact"
            component={DetailContact}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
