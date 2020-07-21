import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import EditModal from "./Modal/EditModal";
import DeleteWarningModal from "./Modal/DeleteWarningModal";

class Patient extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			interval: null,
			deadlineInSeconds: this.props.deadline * 60,
			minutes: 0,
			seconds: 0,
			progressBarValue: 0,
			showEditModal: false,
			showDeleteWarning: false
		};

		this.calculateRemainingTime = this.calculateRemainingTime.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.checkLength = this.checkLength.bind(this);
		this.callPatient = this.callPatient.bind(this);
		this.showEditModal = this.showEditModal.bind(this);
		this.showDeleteWarningModal = this.showDeleteWarningModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
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

	showEditModal() {
		this.setState ({
			showEditModal: true
		});
	}

	showDeleteWarningModal() {
		this.setState({
			showDeleteWarning: true
		});
	}

	closeModal(modalType, changeOccured) {
		if(modalType === "DeleteWarningModal") {
			this.setState ({
				showDeleteWarning: false
			});
		}else if(modalType === "EditModal") {
			this.setState ({
				showEditModal: false
			});
		}
		
		const { refreshPatsInMainpage } = this.props;
		if(changeOccured) {
			refreshPatsInMainpage();
		}
	}

	callPatient() {
		const { patient: { firstName, lastName }, nextPatient } = this.props;
		nextPatient(firstName + " " + lastName);
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
		const { progressBarValue, deadlineInSeconds, showEditModal, showDeleteWarning } = this.state;
		const {
			patient: {
				id, firstName, lastName, details, priority, isWIP
			},
			userToken, depId
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

						{/* Call Patient Button */}
						<button
							className="button is-success pr-4 pl-4 has-icons"
							onClick={this.callPatient}
						>
							<span className="icon">
								<i className="fas fa-bullhorn"></i>
							</span>
						</button>

						{/* Edit Patient Button */}
						<button 
							className="button is-info pr-4 pl-4 has-icons"
							onClick={this.showEditModal}
						>
							<span className="icon">
								<i className="far fa-edit"></i>
							</span>
						</button>

						<button 
							className="button is-danger has-icons"
							onClick={this.showDeleteWarningModal}
						>
							<span className="icon">
								<i className="fas fa-trash-alt"></i>
							</span>
						</button>
					</div>
				</td>

				<EditModal
					showModal = {showEditModal}
					modalClosingRequest = {this.closeModal}
					userToken = {userToken}
					depId = {depId}
					patId = {id}
					firstName = {firstName}
					lastName = {lastName}
					details = {details}
					priority = {priority}
					isWIP = {isWIP}
				/>

				<DeleteWarningModal 
					showModal = {showDeleteWarning} 
					patName = {firstName + " " + lastName}
					depId = {depId}
					patId = {id}
					token = {userToken}
					modalClosingRequest = {this.closeModal}
				/>
			</tr>
		);
	}
}

Patient.propTypes = {
	patient: PropTypes.object.isRequired,
	deadline: PropTypes.number.isRequired,
	nextPatient: PropTypes.func.isRequired,
	userToken: PropTypes.string.isRequired,
	depId: PropTypes.number.isRequired,
	refreshPatsInMainpage: PropTypes.func.isRequired
};

export default Patient;