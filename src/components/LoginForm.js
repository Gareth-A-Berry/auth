import React, { Component } from 'react'
import { Button, Card, CardSection, Input, Spinner} from './common'
import firebase from 'firebase'
import { Text } from 'react-native'

class LoginForm extends Component {
  state = {email: '', password: '', error: '', loading: false}

  onButtonPress() {
    const { email, password } = this.state

    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this)
      )
    })
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })

  }

  onLoginFail (error) {
    this.setState({
      loading: false,
      error: error.message
    })
  }

  renderButton () {
    if (this.state.loading) {
      return <Spinner size={'small'}/>
    } else {
      return <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    }
  }

  render() {
    return(
        <Card>
          <CardSection>
            <Input
                placeholder={'user@email.com'}
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                label={'Email'}
            />
          </CardSection>
          <CardSection>
            <Input
                secureText
                placeholder={'password'}
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                label={'Password'}
            />
          </CardSection>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
          <CardSection>
            {this.renderButton()}
          </CardSection>

        </Card>
    )
  }
}

const styles = {
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}



export default LoginForm