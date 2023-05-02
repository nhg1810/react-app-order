import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import io from 'socket.io-client'

export default class App extends Component {
  constructor(props) {
    super(props)
    // this.socket= io("http://localhost:3000", {jsonp: false})
  }

  componentDidMount() {
    const socket = io("http://192.168.1.10:3000");
  }
  
  render() {
    return (
      <AppContainer />
    )
      ;
  }
}
