import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

class QRRegistrationScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasPermission: null,
			scanned: false
		}

		this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	componentDidMount() {
		(async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			if(status === 'granted') {
				this.setState({
					hasPermission: true
				})
			}else{
				this.setState({
					hasPermission: false
				})
			}
		})();
	}

	handleBarCodeScanned(data){
		//Redirection to Waiting Time Screen with data
		//props should be sent as a json 'object'
		this.props.navigation.navigate('Waiting', { id: data });
	}

	cancel() {
		this.props.navigation.goBack();
	}

	render() {
		const { scanned, hasPermission } = this.state;
		
		return (
			<View style = {styles.mainContainer}>
			 	{/* QR Code Scanner is only showed after giving user permission */}
				{
					hasPermission === true ? (
						<BarCodeScanner
							onBarCodeScanned = {(obj) => this.handleBarCodeScanned(obj.data)}
							style = {[StyleSheet.absoluteFill, styles.container]}
						>
							<View style={styles.layerTop}>
								<Text style={styles.labelText}>
									Scan QR Code
								</Text>
							</View>
							
							<View style={styles.layerCenter}>
								<View style={styles.layerLeft} />
								<View style={styles.focused} />
								<View style={styles.layerRight} />
							</View>

							<View style={styles.layerBottom}>
								<TouchableOpacity onPress = {this.cancel}>
									<Text style={styles.buttonText}>Cancel</Text>
								</TouchableOpacity>
							</View>
						</BarCodeScanner>
					) : (
						<View>
							<Text style = {hasPermission === false ? styles.display : styles.hide}>
								You have not granted permission to use the camera on this device!
							</Text>
							<TouchableOpacity onPress = {this.cancel}>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					)
				}
			</View>
		);
	}
}

export default QRRegistrationScreen;

const opacity = 'rgba(0, 0, 0, .7)';

const styles = StyleSheet.create ({
	mainContainer: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	display: {
		display: 'flex',
		color: '#e63946',
		marginTop: -60,
		fontSize: 20,
		fontWeight: 'bold',
		fontStyle: 'italic',
		paddingRight: 20,
		paddingLeft: 20,
		textAlign: 'center'
	},

	hide: {
		display: 'none'
	},

	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#000000'
	},

	labelText: {
		fontSize: 24,
		color: '#FFFFFF',
		fontWeight: 'bold',
		textAlign: 'left',
    	paddingTop: 60,
    	paddingLeft: 10
	},

	layerTop: {
		flex: 1,
		backgroundColor: opacity,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingLeft: 20,
   	paddingBottom: -30
	},

	layerCenter: {
		flex: 2,
		flexDirection: 'row'
	},

	layerLeft: {
		flex: 1,
		backgroundColor: opacity
	},

	focused: {
		flex: 10,
		borderStyle: "solid",
		borderWidth: 5,
		borderColor: '#FFFFFF'
	},

	layerRight: {
		flex: 1,
		backgroundColor: opacity
	},

	layerBottom: {
		flex: 1,
		backgroundColor: opacity,
		alignItems: 'center',
		justifyContent: 'center'
	},

	buttonText: {
		fontSize: 18,
		color: '#FFFFFF',
		fontWeight: 'bold',
		marginTop: 80
	}
})