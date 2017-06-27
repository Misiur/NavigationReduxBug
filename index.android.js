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
  View
} from 'react-native';

import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { createStore, combineReducers } from 'redux';
import { connect } from 'react-redux';

const Foo = () => {
  return (
    <View style={styles.container}>
      <Text>Hello there</Text>
    </View>
  );
};

const Bar = () => {
  return (
    <View style={styles.container}>
      <Text>General kenobi</Text>
    </View>
  );
};

const NestedNavigator = StackNavigator({
  Bar: { screen: Bar },
});

const AppNavigator = StackNavigator({
  NestedNavigator: { screen: NestedNavigator },
  Foo: { screen: Foo },
});

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('NestedNavigator'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  nav: navReducer,
});

class App extends React.Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Nav', () => Root);
