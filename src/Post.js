import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';

import ScalableImage from 'react-native-scalable-image'
import _ from 'lodash'

import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="heart-o" size={30} color="#e74c3c" />)

export default class Post extends Component {
	constructor() {
		super();

		let loveIcon = (<Icon name="heart-o" size={30} color="#aaa" />);

		this.state = {
			width: Dimensions.get('window').width,
			loveIcon
		};
	}

	_handleLike() {
		this.props.like(this.props.post.id);
	}

	componentWillMount() {
		let loveIcon = (<Icon name="heart" size={30} color="#e74c3c" />)

		if (_.indexOf(this.props.post.likedBy, 'cosmoserdean') != -1)
			this.setState({loveIcon});
	}

	render() {
		return (
			<View style={styles.container}>
				<UserInfo user={this.props.post.user}/>
				<ScalableImage
				source={{uri:this.props.post.image}}
				width={this.state.width}/>
				<Actions icon={this.state.loveIcon} onLike={this._handleLike.bind(this)}/>
			</View>
		);
	}
}

const UserInfo = (props) => {
	return (
		<View style={styles.barView}>
			<Image source={{uri: props.user.avatar}} style={{width: 32, height: 32, borderRadius: 100}}></Image>
			<Text style={styles.user}>{props.user.username}</Text>
		</View>
	);
}

const Actions = (props) => {
	return (
		<View style={styles.actionView}>
			<TouchableOpacity style={styles.barView} onPress={props.onLike}>
				{props.icon}
			</TouchableOpacity>
		</View>

	);
}

const styles = StyleSheet.create({
	user: {
		color: '#222',
		fontWeight: '900',
		fontSize: 15,
		padding: 8
	},
	barView: {
		flexDirection:'row',
		alignItems: 'center',
		padding: 8
	},
	actionView: {
		flexDirection:'row',
		alignItems: 'center',
		padding: 8
	}
})