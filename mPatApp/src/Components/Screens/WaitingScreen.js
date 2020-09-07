import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import axios from 'axios';

class WaitingScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timePassed: false
		}
	}
	
	componentDidMount() {
		setTimeout(() => {
			this.setState({
				timePassed: true
			}, () => {
				//backend request
				//url should be changed later !!
				axios.get(
					'http://192.168.2.119:5000/patients/' + this.props.route.params.id
				).then((obj) => {
					//Stack reset and at the same time navigation to Patient Info Screen
					this.props.navigation.reset({
						index: 0,
						routes: [{ 
							name: 'Patient Info',
							params: {
								patId: this.props.route.params.id,
								patInfo: obj.data
							}
						}],
					});

				}).catch((exception) => {
					console.log('App: ' + exception);
					//Notifcation of Error
					alert('Please provide a correct id number!');
					this.props.navigation.goBack();
				})
			})
		}, 5000);
	}

	render() {
		return(
			<LottieView
				source = {require('../../../assets/hourglass.json')}
				backgroundColor = '#3490dc'
				autoPlay
				loop
			/>
		)
	}
}

export default WaitingScreen;