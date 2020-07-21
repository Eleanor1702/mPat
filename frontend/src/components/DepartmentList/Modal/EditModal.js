import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./EditModal.css";

class EditModal extends React.Component {
	constructor(props) {
		super(props);
		const { depName, wipThreshold } = this.props;
		this.state = {
			processRequested: false,
			depNameHasError: false,
			wipHasError: false,
			departmentName: depName,
			wipThreshold: wipThreshold,
			tooltipContent: 
				"Once no new patient's deadline is lesser \n" +
				"than this value, a WIP Patient (Work in \n" +
				"Process Patient) will be taken next.",
		};

		this.requestClosing = this.requestClosing.bind(this);
		this.isWipThresholdValid = this.isWipThresholdValid.bind(this);
		this.isDepartmentNameValid = this.isDepartmentNameValid.bind(this);
		this.handleDepartmentNameChange = this.handleDepartmentNameChange.bind(this);
		this.handleWipThresholdChange = this.handleWipThresholdChange.bind(this);
		this.handleEditClick = this.handleEditClick.bind(this);
		this.requestEdit = this.requestEdit.bind(this);
	}

	//The boolean 'departmentCreated' serves giving a hint wether the Modal is closed through 'cancel'
	//or after creating a new department and a refresh is needed
	//True => Department created, Refresh is needed
	//False => Process was interrupted, no Refresh needed
	requestClosing(departmentEdited) {
		const { modalClosingRequest, depName, wipThreshold } = this.props;
		
		//If No saving is required, then keep intial data in labels
		if(!departmentEdited) {
			this.setState ({
				departmentName: depName,
				wipThreshold: wipThreshold
			});
		}

		this.setState ({
			processRequested: false
		},
		() => modalClosingRequest("EditModal", departmentEdited));
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
			this.setState({
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

		if( departmentName === null || departmentName.trim() === "") {
			this.setState ({
				departmentHasError: true
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

	requestEdit() {
		const { depId, token } = this.props;
		const { departmentName, wipThreshold } = this.state;

		axios.put("http://localhost:5000/departments/" + depId, {
			//Body Content
			departmentName: departmentName,
			wipThreshold: parseInt(wipThreshold)
		}, {
			//Headers 
			headers: {
				token: token
			}
		}).then(() => {
			this.requestClosing(true);
		}).catch(() => {
			console.log("Error! Something went wrong while connecting to Server!");
			this.setState ({
				processRequested: false
			});
		});
	}

	handleEditClick() {
		this.setState({
			processRequested: true
		},
		() => this.requestEdit());
	}

	render() {
		const {
			processRequested, depNameHasError,
			wipHasError, departmentName,
			wipThreshold, tooltipContent
		} = this.state;
		const { showModal } = this.props;

		return (
			<div className={`modal ${showModal ? "is-active" : ""}`}>
				<div className="modal-background"></div>
				<div className="modal-content">
					{/* Any other elements you want */}
					<header className="modal-card-head">
						<p className="modal-card-title">Edit Department</p>
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
								onClick={this.handleEditClick}
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

EditModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	modalClosingRequest: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired,
	depName: PropTypes.string.isRequired,
	wipThreshold: PropTypes.number.isRequired,
	depId: PropTypes.number.isRequired
};

export default EditModal;