import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  ToastAndroid,
  RefreshControl,

} from 'react-native';
import axios from 'axios';
import _ from 'lodash';


import Post from './Post'

let posts = [
	{
		id: 4543234,
		user: {
			username: 'cosminserdean',
			avatar: 'https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/15622040_1235506319861495_6293662051030064991_n.jpg?oh=503d4469792a830dc1625db6c0b6e161&oe=596B9F0D',
		},
		image: 'https://img-9gag-fun.9cache.com/photo/avGQWNW_700b.jpg',
		likedBy: ['cosmoserdean', 'cacanau25']
	},
	{
		id: 3123123,
		user: {
			username: 'cosmoserdean',
			avatar: 'https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/15622040_1235506319861495_6293662051030064991_n.jpg?oh=503d4469792a830dc1625db6c0b6e161&oe=596B9F0D',
		},
		image: 'https://img-9gag-fun.9cache.com/photo/avGQWNW_700b.jpg',
		likedBy: ['cacanau25']
	},
]

export default class PostList extends Component {
	constructor() {
		super();

		this.state = {
			refreshing: false,
			posts: posts
		}
	}

	_onRefresh() {
		this.setState({refreshing: true});
		axios.get('http://localhost:3000/cool')
			.then((res) => {
				console.log(res.data);
				this.setState({refreshing: false});
			});
	}

	_handleLike(id) {
		posts[_.findIndex(posts, { id })].likedBy.push('cosmoserdean');
		this.setState(posts: posts);
		ToastAndroid.show('caca', ToastAndroid.LONG);
	}

	render() {
		const postsList = this.state.posts.map((post) => {
			return <Post post={post} key={post.id} like={this._handleLike.bind(this)}/>
		})

		return (
			<ScrollView
			style={this.props.style}
			refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh.bind(this)}/>}>
					
					{postsList}

			</ScrollView>
		);
	}
}