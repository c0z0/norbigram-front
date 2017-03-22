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
import axios from 'axios';

import { Actions } from 'react-native-router-flux';

import validator from 'email-validator';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignupScreen extends Component {
	constructor() {
		super();
		this.state = {disabled: true, err: false, loading: false};

		this._onChange = this._onChange.bind(this);
		this._onPress = this._onPress.bind(this);
	}

	_onChange(text) {
		this.text = text;
		if (validator.validate(text))
			this.setState({disabled: false});
		else
			this.setState({disabled: true});
	}

	_onPress() {
		if (!this.state.disabled) {
			this.setState({loading: true})
			axios.post('http://localhost:3000/u/email', {email: this.text})
				.then((res) => {
					this.setState({loading: false, err: false})
					if (res.data.foundUser)
						return this.setState({err: "Email already in use"})
					Actions.signup2({email: this.text});
				}, (err) => {
					this.setState({loading: false, err: err.message})
				});
		}
	}

	render() {
		let err = null;

			if (this.state.err)
				err = <ErrorPop text={this.state.err}/>
		return (
			<View style={styles.containerExt}>
				{err}
				<View style={styles.container}>
					<View>
						<Icon name="envelope" size={130} color="#555"/>
					</View>
					<TextInput
						keyboardType="email-address"
						autoFocus={true}
						returnKeyType="next"
						onSubmitEditing={this._onPress}
						style={styles.input}
						underlineColorAndroid="rgba(0,0,0,0)"
						placeholder="Email"
						placeholderTextColor="#cdd2d5"
						onChangeText={this._onChange}/>
					<DisabledLogin
						disabled={this.state.disabled}
						onPress={this._onPress}
						loading={this.state.loading}/>
				</View>
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

const ErrorPop = (props) => {
	return (<View style={styles.err}><Text style={styles.errText}>{props.text}</Text></View>);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerExt: {
		flex: 1
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
		marginBottom: 20,
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
	},
	disabledButton: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 48,
		width: 360,
		marginBottom: 20,
		borderColor: 'rgba(52, 152, 219, .3)',
		borderRadius: 3,
		borderWidth: .5
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