import React, { Component } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/Components/Screens/RegisterScreen';
import HomeScreen from './src/Components/Screens/HomeScreen';
import AppNameAndIcon from './src/Components/TitleBar/AppNameAndIcon';
import HamburgerButton from './src/Components/TitleBar/HamburgerButton';
import ManualRegistrationScreen from './src/Components/Screens/ManualRegistrationScreen';
import QRRegistrationScreen from './src/Components/Screens/QRRegistrationScreen';
import WaitingScreen from './src/Components/Screens/WaitingScreen';
import PatientInfoScreen from './src/Components/Screens/PatientInfoScreen';

//Stacks all previous called Screens in App and enables calling them, when
//'Back Button' is triggered in mobile
const Stack = createStackNavigator();

class App extends Component {

	render() {
		return (
			<MenuProvider>
				{/*Takes care of navigating to another screen (Routing System)*/}
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen 
							name="Home"
							component={HomeScreen}
							options = {options.homeScreenOptions}
						/>
						<Stack.Screen 
							name="Registration"
							component={RegisterScreen}
							options = {options.registrationScreenOptions}
						/>
						<Stack.Screen
							name = 'Manual Registration'
							component = {ManualRegistrationScreen}
						/>
						<Stack.Screen
							name = 'QR Code Registration'
							component = {QRRegistrationScreen}
							options = {{headerShown: false}}
						/>
						<Stack.Screen
							name = 'Waiting'
							component = {WaitingScreen}
							options = {{headerShown: false}}
						/>
						<Stack.Screen
							name = 'Patient Info'
							component = {PatientInfoScreen}
							options = {options.patientInfoScreenOptions}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</MenuProvider>
			
		);
	}
}

export default App;

const options = {
	registrationScreenOptions: {
		title: "Register Yourself"
	},
	
	homeScreenOptions: {
		//(...props) means 'Spread Attributes' => aims for an easier
		//props passing, instead of listing them all, this term suffice
		headerTitle: props => <AppNameAndIcon {...props} />,
		headerRight: props => <HamburgerButton {...props} />
	},

	patientInfoScreenOptions: {
		headerTitle: props => <AppNameAndIcon {...props} />
	}
};