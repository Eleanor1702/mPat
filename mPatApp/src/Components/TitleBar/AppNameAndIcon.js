import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

class AppNameAndIcon extends Component {
	render () {
		return(
			<View style = {styles.container}>
				<Image style = {styles.appIcon} source={require('../../../assets/waiting-room.png')} />
				<Text style = {styles.title}>mPat</Text>
			</View>
		);
	}
}

export default AppNameAndIcon;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: 100,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start'
	},

	appIcon: {
		width: 35,
		height: 35,
		marginRight: 10
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold'
	}
})