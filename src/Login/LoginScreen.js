import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ToastAndroid
} from 'react-native';
import axios from 'axios';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'

import LoginForm from './LoginForm'

export default class LoginScreen extends Component {
	constructor() {
		super();
		this.state = {
			err: false,
			loading: false
		}
	}

	login(email, password) {
		this.setState({loading: true})
		axios.post('http://localhost:3000/u/login', {user: {email, password}})
			.then((res) => {
				const { data } = res;
				this.setState({loading: false, err: false})
				if (data.err)
					return this.setState({err: data.err});
				ToastAndroid.show(`Welcome ${data.foundUser.name}!`, ToastAndroid.LONG);
			}, (err) => {
				this.setState({err: err.message, loading: false});
			});
	}

	render() {
		let err = null;

		if (this.state.err)
			err = <ErrorPop text={this.state.err}/>
		return (
			<AnimatedLinearGradient
				colors={gradientColors}
				start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
				{err}
				<StatusBar
					backgroundColor="#000"/>
				<View style={styles.container}>
					<Text style={styles.logoText}>
						Norbigram
					</Text>
					<LoginForm submit={this.login.bind(this)} loading={this.state.loading}/>
				</View>
			</AnimatedLinearGradient>
		);
	}
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
	logoText: {
		elevation: 4,
		color: '#fff',
		fontSize: 70,
		fontFamily: 'Billabong'
	},
	preview: {
		zIndex: 10,
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
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

const gradientColors = [
    'rgba(106, 57, 171, .3)',
    'rgba(151, 52, 160, .3)',
    'rgba(197, 57, 92, .3)',
    'rgba(231, 166, 73, .3)',
    'rgba(181, 70, 92, .3)'
  ];