import React, { Component } from 'react';
import moment from "moment";
import axios from 'axios';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { faWalking } from '@fortawesome/free-solid-svg-icons';

class PatientInfoScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			waitingTime: '',
			waitingTimeInterval: null,
			updateDataInterval: null,
			patInfo: this.props.route.params.patInfo,
			patId: this.props.route.params.patId
		}

		this.calculateWaitingTime = this.calculateWaitingTime.bind(this);
		this.updateData = this.updateData.bind(this);
		this.endSession = this.endSession.bind(this);
	}

	componentDidMount(){
		this.calculateWaitingTime();

		this.setState ({
			waitingTimeInterval: setInterval(this.calculateWaitingTime, 1000),
			updateDataInterval: setInterval(this.updateData, 5000)
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.waitingTimeInterval);
		clearInterval(this.state.updateDataInterval);
	}

	updateData() {
		const { patId } = this.state;

		axios.get(
			'http://192.168.2.119:5000/patients/' + patId
		).then((obj) => {
			this.setState({
				patInfo: obj.data
			})
		}).catch((exception) => {
			alert(exception);
		})
	}

	calculateWaitingTime() {
		const { priority, createdAt } = this.state.patInfo;
		const maxTime = moment(createdAt).add(deadlines[priority], 'minutes');

		const timeDiff = maxTime.diff(moment(), "seconds") / 60;
		let minutes = 0;

		if(timeDiff < 0) {
			minutes = Math.ceil(timeDiff);
		}else{
			minutes = Math.floor(timeDiff);
		}

		//While time is running negative or equals 0, a 0 suffice as time
		if(minutes <= 0) {
			this.setState({
				waitingTime: '0' + '\n' + 'min'
			}); 
		}else{
			this.setState({
				waitingTime: minutes + '\n' + 'min'
			}); 
		}
	}

	endSession() {
		//Stack reset and at the same time navigation to Home Screen
		this.props.navigation.reset({
			index: 0,
			routes: [{ 
				name: 'Home'
			}],
		});
	}

	renderNotCalled() {
		return (
			<View style = {styles.container}>
				<Text style = {styles.topText}>In approx.</Text>
				<View style = {styles.roundView}>
					<Text style = {styles.message}>{this.state.waitingTime}</Text>
				</View>
				<Text style = {styles.botText}>it should be your turn</Text>
				<View style = {styles.buttonContainer}>
					<FontAwesomeIcon
						style = {styles.icon}
						size = { 30 }
						icon = { faUserInjured }
					/>
					<Text style = {styles.registerText}>
						Ahead of you:  {this.state.patInfo.patPosition} patients
					</Text>
				</View>
			</View>
		);
	}

	renderIsCalled() {
		return (
			<View style = {styles.container}>
				<Text style = {styles.topText}>Please head to the counter</Text>
				<View style = {styles.roundViewIfCalled}>
					<Text style = {styles.messageIfCalled}>You have been called!</Text>
				</View>
				<TouchableOpacity style = {styles.touchableOpacityContainer} onPress = {this.endSession}>
					<View style = {styles.buttonContainerIfCalled}>
						<FontAwesomeIcon
							style = {styles.icon}
							size = { 30 }
							icon = { faWalking }
						/>
						<Text style = {styles.registerText}>
							I am coming!
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	render() {
		const { patInfo } = this.state;
		
		if(patInfo.isCalled) {
			return this.renderIsCalled();
		}

		return this.renderNotCalled();
	}
}

export default PatientInfoScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	topText: {
		fontSize: 32,
		textAlign: 'center',
		marginTop: -5,
		marginBottom: 50,
		paddingRight: 20,
		paddingLeft: 20
	},

	topTextIfCalled: {
		fontSize: 32,
		textAlign: 'center',
		marginTop: -10,
		marginBottom: 100,
		paddingRight: 20,
		paddingLeft: 20
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

	roundViewIfCalled: {
		width: 300,
		height: 300,
		backgroundColor: '#CBE5D5',
		borderRadius: 150,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 50
	},

	botText: {
		fontSize: 32,
		textAlign: 'center',
		marginTop: 50,
		marginBottom: -50,
		paddingRight: 20,
		paddingLeft: 20
	},

	message: {
		fontSize: 70,
		textAlign: 'center',
		color: '#5F595C'
	},

	messageIfCalled: {
		fontSize: 48,
		textAlign: 'center',
		color: '#5F595C'
	},

	buttonContainer: {
		borderRadius: 4,
		paddingLeft: 28,
		paddingRight: 28,
		paddingTop: 15,
		paddingBottom: 15,
		alignItems: 'center',
		backgroundColor: '#62B0E4',
		display: 'flex',
		flexDirection: 'row',
		marginTop: 110
	},

	touchableOpacityContainer: {
		marginTop: 80
	},

	buttonContainerIfCalled: {
		borderRadius: 4,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 15,
		paddingBottom: 15,
		alignItems: 'center',
		backgroundColor: '#B81800',
		display: 'flex',
		flexDirection: 'row'
	},

	registerText: {
		color: '#ffffff',
		fontSize: 20,
		marginLeft: 10
	},

	icon: {
		color: '#FFFFFF'
	}
})

//translate priorities into deadlines
const deadlines = {
	'Emergent': 15,
	'Urgent': 30,
	'Less Urgent': 60,
	'Non Urgent': 120
};