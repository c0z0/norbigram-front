import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class TitleBar extends Component {
	render() {
		return (
			<View style={styles.outerBar}>
				<View style={styles.bar}>
					<Text style={styles.barText}>Norbigram</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bar: {
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomColor: '#fa5fff',
		borderBottomWidth: 3
	},
	outerBar: {
		borderBottomColor: '#8d0092',
		borderBottomWidth: 2
	},
	barText: {
		fontSize: 30,
		color: '#222',
		fontWeight: '700',
		fontFamily: 'Billabong'
	}
});