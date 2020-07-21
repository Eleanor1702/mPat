import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class EditModal extends React.Component {
	constructor(props) {
		super(props);

		const { firstName, lastName, details, priority, isWIP } = this.props;
		this.state = {
			processRequested: false,
			firstNameHasError: false,
			lastNameHasError: false,
			firstName: firstName,
			lastName: lastName,
			details: details,
			priority: priority,
			isWIP: isWIP
		};

		this.requestClosing = this.requestClosing.bind(this);
		this.isFirstNameValid = this.isFirstNameValid.bind(this);
		this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		this.handleLastNameChange = this.handleLastNameChange.bind(this);
		this.requestPatientCreation = this.requestPatientCreation.bind(this);
		this.handleCreationClick = this.handleCreationClick.bind(this);
		this.handleIsWIPChange = this.handleIsWIPChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleDetailsChange = this.handleDetailsChange.bind(this);
	}

	//The boolean 'patientCreated' serves giving a hint wether the Modal is closed through 'cancel'
	//or after adding a patient a refresh is needed
	//True => Patient added, Refresh is needed
	//False => Process was interrupted, no Refresh needed
	requestClosing(patientEdited) {
		const { modalClosingRequest, firstName, lastName, details, priority, isWIP } = this.props;

		if(!patientEdited) {
			this.setState ({
				firstName: firstName,
				lastName: lastName,
				details: details,
				isWIP: isWIP,
				priority: priority,
				firstNameHasError: false,
				lastNameHasError: false
	
			});
		}

		this.setState ({
			processRequested: false
		}, () => 
			modalClosingRequest("EditModal", patientEdited)
		);
	}

	//this function returns boolean values (true, false) which serves calling
	//requestPatientCreation, which needs a validation before calling the backend
	isFirstNameValid() {
		const { firstName } = this.state;
		if( firstName === null || firstName.trim() === "" ) {
			this.setState ({
				firstNameHasError: true
			});
			return false;
		}else{
			this.setState ({
				firstNameHasError: false
			});
			return true;
		}
	}

	handleFirstNameChange(event) {
		const { value } = event.target;
		this.setState ({
			firstName: value
		}, () =>
			this.isFirstNameValid()
		);
	}

	//this function returns boolean values (true, false) which serves calling
	//requestPatientCreation, which needs a validation before calling the backend
	isLastNameValid() {
		const { lastName } = this.state;
		if( lastName === null || lastName.trim() === "" ) {
			this.setState ({
				lastNameHasError: true
			});
			return false;
		}else{
			this.setState ({
				lastNameHasError: false
			});
			return true;
		}
	}

	handleLastNameChange(event) {
		const { value } = event.target;
		this.setState ({
			lastName: value
		}, () => 
			this.isLastNameValid()
		);
	}

	requestPatientCreation() {
		const { firstName, lastName, details, isWIP, priority } = this.state;
		//Required for validating user accessibility to create a department
		const { userToken, depId, patId } = this.props;
		//Allow calling both validation functions beforehand, so validation effect occur
		//for both inputs
		const firstNameValid = this.isFirstNameValid();
		const lastNameValid = this.isLastNameValid();

		if(!firstNameValid || !lastNameValid) {
			this.setState({
				processRequested: false
			});
		}else{
			axios.put("http://localhost:5000/departments/" + depId + "/patients/" + patId, {
				//Body Content
				firstName: firstName,
				lastName: lastName,
				details: details,
				isWIP: isWIP === "true",
				priority: priority

			}, {
				//Headers
				headers: {
					token: userToken
				}

			}).then(() => {
				this.requestClosing(true);

			}).catch(() => {
				console.log("Error! Something went wrong while connecting to Server!");
				this.setState ({
					firstNameHasError: true,
					lastNameHasError: true,
					processRequested: false
				});
			});
		}	
	}

	handleCreationClick() {
		this.setState ({
			processRequested: true
		}, () => 
			this.requestPatientCreation()
		);
	}

	handleIsWIPChange(event) {
		const { value } = event.target;
		this.setState ({
			isWIP: value
		});
	}

	handlePriorityChange(event) {
		const { value } = event.target;
		this.setState ({
			priority: value
		});
	}

	handleDetailsChange(event) {
		const { value } = event.target;
		this.setState ({
			details: value
		});
	}

	render() {
		const { showModal } = this.props;
		const {
			processRequested, firstNameHasError,
			lastNameHasError, firstName,
			lastName, details, priority, isWIP
		} = this.state;

		return (
			<div className={`modal ${showModal ? "is-active" : ""}`}>
				<div className="modal-background"></div>
				<div className="modal-content">
					{/* Any other elements you want */}
					<header className="modal-card-head">
						<p className="modal-card-title">Edit Patient</p>
					</header>
					<section className="modal-card-body">
						<div className="field">
							<label className="label">Patient First Name</label>
							<p className="control has-icons-left has-icons-right">
								<input 
									className={`input ${firstNameHasError ? "is-danger" : ""}`}
									value={firstName}
									placeholder="First Name" 
									onChange={this.handleFirstNameChange} 
								/>
								<span className="icon is-small is-left">
									<i className="far fa-user"></i>
								</span>
							</p>
						</div>

						<div className="field">
							<label className="label">Patient Last Name</label>
							<p className="control has-icons-left has-icons-right">
								<input 
									className={`input ${lastNameHasError ? "is-danger" : ""}`}
									value={lastName} 
									placeholder="Last Name"
									onChange={this.handleLastNameChange}
								/>
								<span className="icon is-small is-left">
									<i className="far fa-user"></i>
								</span>
							</p>
						</div>

						<div className="field">
							<label className="label">
								Patient Type
								<span className="has-no-border-bottom" data-tooltip={EditModal.patTypeTooltip}>
									<i className="fas fa-question-circle has-text-info has-ml-half"></i>
								</span>
							</label>
							<div className="control has-icons-left has-icons-right">
								<div className="select is-info">
									<select value={isWIP} onChange={this.handleIsWIPChange}>
										<option value={"false"}>New Patient</option>
										<option value={"true"}>Returning Patient (WIP)</option>
									</select>
								</div>
								<div className="icon is-small is-left">
									<i className="fas fa-user-injured"></i>
								</div>
							</div>
						</div>

						<div className="field">
							<label className="label">
								Patient Priority
								<span className="has-no-border-bottom" data-tooltip={EditModal.priorityTooltip}>
									<i className="fas fa-question-circle has-text-info has-ml-half"></i>
								</span>
							</label>
							<div className="control has-icons-left has-icons-right">
								<div className="select is-info">
									<select value={priority} onChange={this.handlePriorityChange}>
										<option value={"Emergent"}>Emergent (15 min)</option>
										<option value={"Urgent"}>Urgent (30 min)</option>
										<option value={"Less Urgent"}>Less Urgent (60 min)</option>
										<option value={"Non Urgent"}>Non Urgent (120 min)</option>
									</select>
								</div>
								<div className="icon is-small is-left">
									<i className="fas fa-user-clock"></i>
								</div>
							</div>
						</div>

						<div className="field">
							<label className="label">Details</label>
							<p className="control has-icons-left has-icons-right">
								<textarea 
									className="textarea"
									placeholder="Insert details about the patient here..."
									value={details}
									onChange={this.handleDetailsChange}
								></textarea>
							</p>
						</div>

					</section>
					<footer className="modal-card-foot display-block">
						<div className="buttons is-right">
							<button 
								className={`button is-success ${processRequested ? "is-loading" : ""}`}
								onClick={this.handleCreationClick}
							>
								Save changes
							</button>
							{/* To allow calling a function with a specific parameter as e component event, a lambda expression is needed. 
							It call the function needed and allows providing the needed parameters, like so: () => this.testFunc(para) */}
							<button className="button" onClick={() => this.requestClosing(false)}>Cancel</button>
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

EditModal.patTypeTooltip = (
	"The system distinguishes between a\n" +
	"new patient and a returning patient,\n" +
	"so called Work In Process Patient\n" +
	"(WIP Patient)"
);

EditModal.priorityTooltip = (
	"A priority detemines the maximum time \n" +
	"a single patient in this group can wait."
);

EditModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	details: PropTypes.string.isRequired,
	priority: PropTypes.string.isRequired,
	isWIP: PropTypes.bool.isRequired,
	depId: PropTypes.number.isRequired,
	patId: PropTypes.number.isRequired,
	userToken: PropTypes.string.isRequired,
	modalClosingRequest: PropTypes.func.isRequired
};

export default EditModal;