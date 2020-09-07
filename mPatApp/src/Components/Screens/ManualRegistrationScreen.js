import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

class ManualRegistrationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: null,
			invalid: false
		}

		this.updateTextInput = this.updateTextInput.bind(this);
		this.handleRegistration = this.handleRegistration.bind(this);
	}

	updateTextInput(text) {
		if(text.trim() === "") {
			this.setState({
				input: text,
				invalid: true
			})
		}else{
			this.setState ({
				input: text,
				invalid: false
			})
		}
	}

	handleRegistration() {
		const { input } = this.state;

		if(input === null || input.trim() === ""){
			this.setState({
				invalid: true
			})
		}else{
			//Redirection to Waiting Time Screen with data
			//props should be sent as a json 'object'
			this.props.navigation.navigate('Waiting', { id: input });
		}
	}

	render() {
		const { input, invalid } = this.state;

		return (
			<View style = {styles.container}>
				<Text style = {styles.mainInfoText}>Enter the ID provided to you</Text>
				<Text style = {styles.secondaryInfoText}>(Ask the registration, if necessary)</Text>
				<TextInput
					style = {[styles.inputBox, invalid ? styles.invalidInputBox : {}]}
					placeholder = {'Enter ID'}
					onChangeText = {(text) => this.updateTextInput(text)}
					value = {input}
					keyboardType = {'phone-pad'}
					returnKeyType = 'done'
				/>
				<View style = {styles.touchableOpacityContainer}>
					<TouchableOpacity activeOpacity={0.4} style = {styles.buttonContainer} onPress = {this.handleRegistration}>
						<Text style = {styles.buttonText}>Proceed</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default ManualRegistrationScreen;

const styles = StyleSheet.create ({
	container: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	mainInfoText: {
		fontSize: 32,
		marginTop: -40,
		paddingRight: 20,
		paddingLeft: 20,
		textAlign: 'center'
	},

	secondaryInfoText: {
		marginTop: 20,
		fontSize: 20
	},

	inputBox: {
		alignSelf: 'stretch',
		borderColor: '#C4C0C2',
		borderWidth: 1,
		borderStyle: 'solid',
		paddingRight: 14,
		paddingLeft: 14,
		paddingTop: 7,
		paddingBottom: 7,
		marginTop: 50,
		fontSize: 20,
		marginRight: 30,
		marginLeft: 30
	},

	invalidInputBox: {
		borderColor: '#d62828',
		borderWidth: 1,
		borderStyle: 'solid',
		paddingRight: 14,
		paddingLeft: 14,
		paddingTop: 7,
		paddingBottom: 7,
		marginTop: 50,
		fontSize: 20,
		marginRight: 30,
		marginLeft: 30,
		alignSelf: 'stretch'
	},

	touchableOpacityContainer: {
		marginTop: 50
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