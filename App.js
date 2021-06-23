/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {ThemeProvider} from 'react-native-elements';

import Navigation from './src/navigation/Navigation';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import store from './src/redux/store';
const stores = store();
const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Provider store={stores}>
          <Navigation />
        </Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
