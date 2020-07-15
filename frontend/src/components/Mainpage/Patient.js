import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Patient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			interval: null,
			deadlineInSeconds: this.props.deadline * 60,
			minutes: 0,
			seconds: 0,
			progressBarValue: 0
		};

		this.calculateRemainingTime = this.calculateRemainingTime.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.checkLength = this.checkLength.bind(this);
	}

	componentDidMount() {
		//Function should be called first, so when component is mounted Time is displayed
		this.calculateRemainingTime();

		this.setState ({
			interval: setInterval(this.calculateRemainingTime, 1000)
		});
	}

	componentWillUnmount() {
		clearInterval(this.state.interval);
	}

	calculateRemainingTime() {
		const { patient: { createdAt }, deadline } = this.props;
		const maxTime = moment(createdAt).add(deadline, "minutes");
		const timeDifference = maxTime.diff(moment(), "seconds") / 60;
		let minPart = 0;

		if(timeDifference < 0) {
			minPart = Math.ceil(timeDifference);
		}else{
			minPart = Math.floor(timeDifference);
		}

		const secPart = maxTime.diff(moment(), "seconds") - (minPart * 60);

		this.setState ({
			minutes: minPart,
			seconds: secPart,
			progressBarValue: maxTime.diff(moment(), "seconds")
		});
	}

	//Check whether seconds is a single digit or double (a postive number is necessary)
	//If seconds is single then add "0" before the digit (Looks better)
	checkLength(seconds) {
		return seconds.toString().length === 1 ? "0" + seconds : seconds.toString();
	}

	formatTime() {
		const { seconds, minutes } = this.state;
		const secPart = this.checkLength(Math.abs(seconds));

		//While time is running negative, add a '-' sign when needed
		if(minutes === 0 && seconds < 0) {
			return "-" + minutes + ":" + secPart;
		}
		return minutes + ":" + secPart;
	}

	render() {
		const { progressBarValue, deadlineInSeconds } = this.state;
		const {
			patient: {
				id, firstName, lastName, details
			}
		} = this.props;

		return(
			<tr>
				<td className="has-text-centered">{firstName}</td>
				<td className="has-text-centered">{lastName}</td>
				<td className="has-text-centered">{details}</td>
				<td className="has-text-centered">
					<div className="progress-wrapper">
						{/* The progress bar receives its value from the fuction 'getRemainingTime'. The value is neeeded that is 
						why the function '()' are also needed */}
						<progress className="progress is-success is-large" value={progressBarValue} max={deadlineInSeconds}></progress>
						<p className="progress-value has-text-dark">{this.formatTime()}</p>
					</div>
				</td>
				<td className="has-text-centered">
					<div className="buttons are-small is-centered">
						<button className="button is-success pr-4 pl-4 has-icons">
							<span className="icon">
								<i className="fas fa-bullhorn"></i>
							</span>
						</button>
						<button className="button is-info pr-4 pl-4 has-icons">
							<span className="icon">
								<i className="far fa-edit"></i>
							</span>
						</button>
						<button className="button is-danger has-icons">
							<span className="icon">
								<i className="fas fa-trash-alt"></i>
							</span>
						</button>
					</div>
				</td>
			</tr>
		);
	}
}

Patient.propTypes = {
	patient: PropTypes.object.isRequired,
	deadline: PropTypes.number.isRequired
};

export default Patient;