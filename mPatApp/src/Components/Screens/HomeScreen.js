import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		
		this.goToRegistration = this.goToRegistration.bind(this);
	}

	goToRegistration() {
		this.props.navigation.navigate('Registration');
	}

	render () {
		return (
			<View style = {styles.container}>
				<View style = {styles.roundView}>
					<Text style = {styles.message}>You are not registered in any hospital yet!</Text>
				</View>
				<View style = {styles.touchableOpacityContainer}>
					<View style = {styles.buttonContainer}>
						<TouchableOpacity activeOpacity={0.4} onPress = {this.goToRegistration}>
							<Text style = {styles.registerText}>Register Yourself</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		 );
	}
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	roundView: {
		width: 300,
		height: 300,
		backgroundColor: '#CBE5F6',
		borderRadius: 150,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50
	},

	message: {
		fontSize: 32,
		textAlign: 'center',
		color: '#5F595C'
	},

	touchableOpacityContainer: {
		paddingTop: 130
	},

	buttonContainer: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'transparent',
		backgroundColor: '#3298DC',
		borderStyle: 'solid'
	},

	registerText: {
		color: '#ffffff',
		paddingRight: 32,
		paddingLeft: 32,
		paddingTop: 14,
		paddingBottom: 14,
		fontSize: 20,
	}
})