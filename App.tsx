/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigations/AppNavigator';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
