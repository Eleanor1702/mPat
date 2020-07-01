import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./NewDepartmentModal.css";

class NewDepartmentModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tooltipContent: 
				"Once no new patient's deadline is lesser \n" +
				"than this value, a WIP Patient (Work in \n" +
				"Process Patient) will be taken next.",
			processRequested: false,
			depNameHasError: false,
			departmentName: "",
			wipHasError: false,
			wipThreshold: ""
		};

		this.handleCreationClick = this.handleCreationClick.bind(this);
		this.requestDepartmentCreation = this.requestDepartmentCreation.bind(this);
		this.isDepartmentNameValid = this.isDepartmentNameValid.bind(this);
		this.handleDepartmentNameChange = this.handleDepartmentNameChange.bind(this);
		this.handleWipThresholdChange = this.handleWipThresholdChange.bind(this);
		this.isWipThresholdValid = this.isWipThresholdValid.bind(this);
		this.requestClosing = this.requestClosing.bind(this);
	}

	//The boolean 'departmentCreated' serves giving a hint wether the Modal is closed through 'cancel'
	//or after creating a new department and a refresh is needed
	//True => Department created, Refresh is needed
	//False => Process was interrupted, no Refresh needed
	requestClosing(departmentCreated) {
		const { closeModalRequest } = this.props;

		this.setState ({
			departmentName: "",
			wipThreshold: "",
			processRequested: false
		}, 
		() => closeModalRequest(departmentCreated));
	}

	//this function returns boolean values (true, false) which serves calling
	//requestDepartmentCreation, which needs a validation before calling the backend
	isWipThresholdValid() {
		const { wipThreshold } = this.state;
		//Return 'true' if variable doesnt contains a valid number
		if( wipThreshold === "" || isNaN(wipThreshold) ){
			this.setState ({
				wipHasError: true
			});
			return false;
		}else{
			this.setState ({
				wipHasError: false
			});
			return true;
		}
	}

	handleWipThresholdChange(event) {
		const { value } = event.target;
		this.setState ({
			wipThreshold: value
		},
		() => this.isWipThresholdValid());
	}

	//this function returns boolean values (true, false) which serves calling
	//requestDepartmentCreation, which needs a validation before calling the backend
	isDepartmentNameValid() {
		const { departmentName } = this.state;
		if( departmentName === null || departmentName.trim() === "" ) {
			this.setState ({
				depNameHasError: true
			});
			return false;
		}else{
			this.setState ({
				depNameHasError: false
			});
			return true;
		}
	}

	handleDepartmentNameChange(event) {
		const { value } = event.target;
		this.setState ({
			departmentName: value
		},
		() => this.isDepartmentNameValid());
	}

	requestDepartmentCreation() {
		const { departmentName, wipThreshold } = this.state;
		//Required for validating user accessibility to create a department
		const { token } = this.props;
		//Allow calling both validation functions beforehand, so validation effect occur
		//for both inputs
		const depNameValid = this.isDepartmentNameValid();
		const wipThreshValid = this.isWipThresholdValid();

		if(!depNameValid || !wipThreshValid) {
			this.setState({
				processRequested: false
			});
		}else{
			axios.post("http://localhost:5000/departments", {
				departmentName: departmentName,
				wipThreshold: parseInt(wipThreshold),
			}, {
				headers: {
					token: token
				}
			}).then(() => {
				this.requestClosing(true);
			}).catch(() => {
				console.log("Error! Something went wrong while connecting to Server!");
				this.setState ({
					depNameHasError: true,
					wipHasError: true,
					processRequested: false
				});
			});
		}	
	}

	handleCreationClick() {
		this.setState ({
			processRequested: true
		});
		this.requestDepartmentCreation();
	}

	render() {
		const { 
			tooltipContent, processRequested,
			depNameHasError, wipHasError, 
			departmentName, wipThreshold 
		} = this.state;
		const { showModal } = this.props;

		return (
			<div className={`modal ${showModal ? "is-active" : ""}`}>
				<div className="modal-background"></div>
				<div className="modal-content">
					{/* Any other elements you want */}
					<header className="modal-card-head">
						<p className="modal-card-title">New Department</p>
					</header>
					<section className="modal-card-body">
						<div className="field">
							<label className="label">Department Name</label>
							<p className="control has-icons-left has-icons-right">
								<input 
									className={`input ${depNameHasError ? "is-danger" : ""}`}
									value={departmentName}
									placeholder="Department Name" 
									onChange={this.handleDepartmentNameChange} 
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-notes-medical"></i>
								</span>
							</p>
						</div>

						<div className="field">
							<label className="label">
								WIP-Threshold
								<span className="has-no-border-bottom" data-tooltip={tooltipContent}>
									<i className="fas fa-question-circle has-text-info has-ml-half"></i>
								</span>
							</label>
							<p className="control has-icons-left has-icons-right">
								<input 
									className={`input ${wipHasError ? "is-danger" : ""}`}
									value={wipThreshold} 
									placeholder="WIP-Threshold"
									onChange={this.handleWipThresholdChange}
								/>
								<span className="icon is-small is-left">
									<i className="fas fa-stopwatch"></i>
								</span>
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

NewDepartmentModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	closeModalRequest: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default NewDepartmentModal;