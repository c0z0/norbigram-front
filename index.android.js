/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
  Button,
  StatusBar
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import PostList from './src/PostList'
import LoginScreen from './src/Login/LoginScreen.js'
import SignupScreen from './src/Signup/SignupScreen.js'
import SignupScreen2 from './src/Signup/SignupScreen2.js'
import SignupScreen3 from './src/Signup/SignupScreen3.js'
import TitleBar from './src/TitleBar'


export default class eightGagApp extends Component {
  render() {
    return (
      <Router>
        <Scene key={'root'}>
          <Scene key='login' component={LoginScreen} hideNavBar={true} title={'login'} initial={true} duration={1} />
          <Scene key='signup' component={SignupScreen} hideNavBar={true}  duration={1} />
          <Scene key='signup2' component={SignupScreen2}hideNavBar={true}  duration={1} />
          <Scene key='signup3' component={SignupScreen3} hideNavBar={true}  duration={1} />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  posts: {
    flex: 1,
  }
});

import Camera from './src/Login/Camera'

AppRegistry.registerComponent('eightGagApp',() => eightGagApp);
