import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableNativeFeedback,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import validator from 'email-validator';

export default class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			disabled: true
		}
		this.email = '';
		this.pass = '';
	}

	login() {
		if (!this.state.disabled)
			this.props.submit(this.email, this.pass);
	}

	_onEmailChange(text) {
		this.email = text;
		if (this.email.length && this.pass.length > 5)
			this.setState({disabled: false})
		else
			this.setState({disabled: true})
	}

	_onPassChange(text) {
		this.pass = text;
		if (this.email.length && this.pass.length > 5)
			this.setState({disabled: false})
		else
			this.setState({disabled: true})
	}

	toSignup() {
		Actions.signup();
	}

	render ()	{
		return (
			<View style={styles.container}>
				<TextInput
					keyboardType="email-address"
					onChangeText={this._onEmailChange.bind(this)}
					style={styles.input}
					underlineColorAndroid="rgba(0,0,0,0)"
					placeholder="Email or username"
					placeholderTextColor="rgba(255,255,255,0.3)"/>
				<TextInput
					onChangeText={this._onPassChange.bind(this)}
					style={styles.input}
					secureTextEntry={true}
					underlineColorAndroid="rgba(0,0,0,0)"
					placeholder="Password"
					placeholderTextColor="rgba(255,255,255,0.3)"/>
				<DisabledLogin
					disabled={this.state.disabled}
					submit={this.login.bind(this)}
					loading={this.props.loading}/>
				<TouchableNativeFeedback onPress={this.toSignup}>
					<View style={{flexDirection: 'row'}}>
						<Text style={styles.buttonText}>Don't have an acount?</Text>
						<Text style={styles.bold}> Sign up!</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}

const DisabledLogin = (props) => {

	let stylesLoc = {
		button: styles.loginButton,
		text: styles.loginText,
		opacity: .8
	};


	if (props.disabled)
		stylesLoc = {
			button: styles.disabledButton,
			text: styles.buttonText,
			opacity: 1 
		};

	let text = <Text style={stylesLoc.text}>Login</Text>;

	if (props.loading)
		text = <ActivityIndicator color="#222"/>
	return (
		<TouchableOpacity activeOpacity={stylesLoc.opacity} style={stylesLoc.button} onPress={props.submit}>
			{text}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	buttonText: {
		color: 'rgba(255,255,255,0.3)'
	},
	loginButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
		width: 360,
		marginBottom: 20,
		backgroundColor: 'white',
		borderRadius: 3,
	},
	disabledButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
		width: 360,
		marginBottom: 20,
		borderColor: 'rgba(255,255,255,0.3)',
		borderRadius: 3,
		borderWidth: 2
	},
	input: {
		padding: 8,
		height: 48,
		width: 360,
		marginBottom: 20,
		backgroundColor: 'rgba(255,255,255,0.3)',
		borderRadius: 3,
		color: '#fff'
	},
	bold: {
		fontWeight: '900',
		color: 'rgba(255,255,255,0.3)'
	}
});