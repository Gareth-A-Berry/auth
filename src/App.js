/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firebase from 'firebase'
import {Button, Card, CardSection, Header, Spinner} from './components/common'
import LoginForm from './components/LoginForm'

type Props = {};
export default class App extends Component<Props> {
  state = {loggedIn: null, error: ''}

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyChPeeo0oOSmZnlxSJrUhC_XW9UoF2L-Q0',
      authDomain: 'authentication-86b89.firebaseapp.com',
      databaseURL: 'https://authentication-86b89.firebaseio.com',
      projectId: 'authentication-86b89',
      storageBucket: 'authentication-86b89.appspot.com',
      messagingSenderId: '9419020866'
    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            loggedIn: true
          })
        } else {
          this.setState({
            loggedIn: false
          })
        }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
            <CardSection>
              <Button
                  onPress={() => {
                    firebase.auth().signOut().catch(error => {
                      this.setState({
                        error: error.message
                      })
                    })
                  }}
              >
                Log Out
              </Button>
            </CardSection>
        )
      case false:
        return <LoginForm/>
      default:
        return <Spinner/>

    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'Authentication'}/>
        {this.renderContent()}
        <Text>
          {this.state.error}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})
