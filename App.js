import React, { Component, useContext } from 'react';
import AppContainer from './src/navigations/AppNavigation';
import { SocketContext, SocketProvider } from './src/context/SocketContext';

export default class App extends Component {
  render() {
    const {message} = this.context;
    console.log('message', this.context);
    return (
      <SocketProvider>
        <AppContainer />
      </SocketProvider>
    )
      ;
  }
}
App.contextType = SocketContext;
