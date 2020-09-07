import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class RegisterScreen extends Component {
	constructor(props) {
		super(props);

		this.goToManualRegistration = this.goToManualRegistration.bind(this);
		this.goToQRRegistration = this.goToQRRegistration.bind(this);
	}

	goToManualRegistration() {
		this.props.navigation.navigate('Manual Registration');
	}

	goToQRRegistration() {

		this.props.navigation.navigate('QR Code Registration');
	}

	render () {
		return (
			<View style = {styles.container}>
				<Text style = {styles.labelText}>How would you like to register yourself?</Text>
				
				<View style = {styles.touchableOpacityContainer}>
					<TouchableOpacity activeOpacity={0.4} style = {styles.buttonContainer} onPress = {this.goToQRRegistration}>
						<Text style = {styles.buttonText}>Scan QR Code</Text>
					</TouchableOpacity>
				</View>
				<View style = {styles.touchableOpacityContainer}>
					<TouchableOpacity activeOpacity={0.4} style = {styles.buttonContainer} onPress = {this.goToManualRegistration}>
						<Text style = {styles.buttonText}>Manuel Registration</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	labelText: {
		fontSize: 32,
		textAlign: 'center',
		marginTop: -50,
		paddingRight: 20,
		paddingLeft: 20
	},

	touchableOpacityContainer: {
		marginTop: 80
	},

	buttonContainer: {
		borderRadius: 8,
		borderStyle: 'solid',
		borderWidth: 1,
		backgroundColor: '#3298DC',
		borderColor: 'transparent',
	},

	buttonText: {
		color: '#ffffff',
		paddingRight: 32,
		paddingLeft: 32,
		paddingTop: 14,
		paddingBottom: 14,
		fontSize: 20,
	}
})