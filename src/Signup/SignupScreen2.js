import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';

import { Actions } from 'react-native-router-flux'
import validator from 'email-validator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SignupScreen2 extends Component {
	constructor() {
		super();
		this.state = {disabled: true};
		this.name = '';
		this.pass = '';

		this._onNameChange = this._onNameChange.bind(this);
		this._onPress = this._onPress.bind(this);
		this._onPassChange = this._onPassChange.bind(this)
	}

	_onNameChange(text) {
		this.name = text;
		if (this.pass.length > 5 && this.name.length)
			this.setState({disabled: false});
		else
			this.setState({disabled: true});
	}

	_onPassChange(text) {
		this.pass = text;
		if (this.pass.length > 5 && this.name.length)
			this.setState({disabled: false});
		else
			this.setState({disabled: true});
	}

	_onPress() {
		if (!this.state.disabled)
			Actions.signup3({email: this.props.email, name: this.name, password: this.pass})
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Icon name="tag-text-outline" size={130} color="#555"/>
				</View>
				<TextInput
					autoFocus={true}
					onSubmitEditing={() => this.passInput.focus()}
					returnKeyType="next"
					style={styles.input}
					underlineColorAndroid="rgba(0,0,0,0)"
					placeholder="Full Name"
					placeholderTextColor="#cdd2d5"
					onChangeText={this._onNameChange}/>
				<TextInput
					ref={(input) => { this.passInput = input; }}
					returnKeyType="next"
					onSubmitEditing={this._onPress}
					style={styles.input}
					underlineColorAndroid="rgba(0,0,0,0)"
					placeholder="Password"
					secureTextEntry={true}
					placeholderTextColor="#cdd2d5"
					onChangeText={this._onPassChange}/>
				<DisabledLogin
					disabled={this.state.disabled}
					onPress={this._onPress}/>
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

	let text = <Text style={stylesLoc.text}>Next</Text>;

	if (props.loading)
		text = <ActivityIndicator color="#fff"/>

	return (
		<TouchableOpacity activeOpacity={stylesLoc.opacity} style={stylesLoc.button} onPress={props.onPress}>
			{text}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#555',
		borderWidth: 3,
		borderRadius: 100,
		width: 150,
		height: 150
	},
	input: {
		padding: 8,
		height: 48,
		width: 360,
		backgroundColor: '#f6fbff',
		borderColor: '#cdd2d5',
		borderWidth: .5,
		borderRadius: 3,
		marginTop: 20,
	},
	loginButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
		width: 360,
		marginBottom: 20,
		backgroundColor: '#3498db',
		borderRadius: 3,
		marginTop: 20,
	},
	disabledButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
		width: 360,
		marginBottom: 20,
		borderColor: 'rgba(52, 152, 219, .3)',
		borderRadius: 3,
		borderWidth: .5,
		marginTop: 20,
	},
	loginText: {
		color: '#fff'
	},
	buttonText: {
		color: 'rgba(52, 152, 219, .3)'
	},
	err: {
		backgroundColor: '#fff',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 1
	},
	errText: {
		color: '#c0392b'
	}
});