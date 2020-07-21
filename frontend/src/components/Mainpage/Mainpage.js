import React from "react";
import "./Mainpage.css";
import PriorityTable from "./PriorityTable";
import PropTypes from "prop-types";
import axios from "axios";
import NewPatientModal from "./Modal/NewPatientModal";
import QRcodeModal from "./Modal/QRcodeModal";

class Mainpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			departments: [],
			depId: 0,
			patients: [],
			showModal: false,
			showQRcodeModal: false,
			lastCreatedPatId: "",
			nextPatient: "" 
		};

		this.getDepartments = this.getDepartments.bind(this);
		this.setDepartmentId = this.setDepartmentId.bind(this);
		this.getDepartmentPatients = this.getDepartmentPatients.bind(this);
		this.showNewPatientModal = this.showNewPatientModal.bind(this);
		this.closeModalRequest = this.closeModalRequest.bind(this);
		this.setLastCreatedPatId = this.setLastCreatedPatId.bind(this);
		this.closeQRcodeModalRequest = this.closeQRcodeModalRequest.bind(this);
		this.setNextPatient = this.setNextPatient.bind(this);
	}

	setNextPatient(patient) {
		this.setState ({
			nextPatient: patient
		});
	}

	componentDidMount(){
		this.getDepartments();
	}

	getDepartments() {
		//To get all Department, a token verification is necessary.
		//axios allow data transfer from Frontend to backend through headers
		axios.get(
			"http://localhost:5000/departments", {
				headers: {
					token: this.props.userToken
				}
			}

		).then((departments) => {
			this.setState ({
				departments: departments.data,
				depId: departments.data[0].id

			}, () => {
				this.getDepartmentPatients();
			});

		}).catch((exception) => {
			console.log(exception);
		});
	}

	setDepartmentId(event) {
		this.setState ({
			depId: parseInt(event.target.value)
		},
		() => this.getDepartmentPatients());	
	}

	showNewPatientModal() {
		this.setState ({
			showModal: true
		});
	}

	closeModalRequest(patientCreated) {
		this.setState({
			showModal: false

		}, () => {
			if(patientCreated) {
				this.getDepartmentPatients();
				//"showQRcodeModal should be shown after "NewPatientModal" has been closed"
				//This sequence is more cleaner ane makes more sense
				this.setState ({
					showQRcodeModal: true
				});
			}
		});
	}

	setLastCreatedPatId(id) {
		this.setState ({
			lastCreatedPatId: id
		});
	}

	closeQRcodeModalRequest() {
		this.setState({
			showQRcodeModal: false
		});
	}

	getDepartmentPatients() {
		const { depId } = this.state;
		const { userToken } = this.props;

		//To get all Patients, a token verfication is necessary.
		//Axios allow sending data from Frontend to Backend through 'headers'
		axios.get(
			"http://localhost:5000/departments/" + depId + "/patients", {
				headers: {
					token: userToken
				}
			}

		).then((patients) => {
			this.setState ({
				patients: patients.data
			});

		}).catch((exception) => {
			console.log(exception);
		});
	}

	render() {
		const { userToken } = this.props;
		const { departments, patients, showModal, depId, lastCreatedPatId, showQRcodeModal, nextPatient } = this.state;

		return (
			<div className="container is-fluid mt-5">
				{/* Next Patient Button */}
				<div className="columns is-mobile">
					<div className="column is-one-third is-offset-one-third">
						<button className="button is-info is-size-5 has-icons-left has-text-weight-medium is-fullwidth pt-4 pb-6">
							<span className="icon mr-2">
								<i className="fas fa-user-alt"></i>
							</span>
							Next Patient: {nextPatient}
						</button>
					</div>
				</div>

				<div className="columns">
					{/* Department Selection */}
					<div className="column is-one-third">
						<div className="field">
							<div className="control has-icons-left">
								<div className="select is-info">
									<select onChange={this.setDepartmentId}>
										{departments.map((department) => 
											<option 
												key = {department.id}
												value={department.id}
											>
												{department.name}
											</option>
										)}
									</select>
								</div>
								<div className="icon is-left">
									<i className="fas fa-hospital"></i>
								</div>
							</div>
						</div>
					</div>

					{/*  Space Column */}
					<div className="column"></div>

					<div className="column is-on-third">
						<div className="buttons is-right">
							{/* Refresh Button */}
							<button className="button is-link" onClick={this.getDepartmentPatients}>
								<span className="icon mr-2">
									<i className="fas fa-redo"></i>
								</span>
								<span>Refresh Patients</span>
							</button>

							{/* Add New Patient Button */}
							<button className="button is-success" onClick={this.showNewPatientModal}>
								<span className="icon mr-2">
									<i className="fas fa-user-plus"></i>
								</span>
								<span>Add New Patient</span>
							</button>

							{/* New Patient Modal */}
							<NewPatientModal 
								showModal = {showModal} 
								closeModalRequest = {this.closeModalRequest} 
								token = {userToken}
								depId = {depId}
								patIdConfirmation = {this.setLastCreatedPatId}
							/>

							{/* Barcode Modal */}
							<QRcodeModal
								showModal = {showQRcodeModal}
								closeModalRequest = {this.closeQRcodeModalRequest}
								patId = {lastCreatedPatId}
							/>
						</div>
					</div>
				</div>

				{/* Emergent Panel Patients */}
				<PriorityTable 
					priority = {"Emergent"}
					color = {"danger"}
					depId = {depId}
					patients = {patients.filter(a => a.priority === "Emergent")}
					userToken = {userToken}
					deadline = {15}
					nextPatient = {this.setNextPatient}
					refreshPatsInMainpage = {this.getDepartmentPatients}
				/>

				{/* Urgent Panel Patients */}
				<PriorityTable 
					priority = {"Urgent"}
					color = {"warning"}
					depId = {depId}
					patients = {patients.filter(a => a.priority === "Urgent")}
					userToken = {userToken}
					deadline = {30}
					nextPatient = {this.setNextPatient}
					refreshPatsInMainpage = {this.getDepartmentPatients}
				/>

				{/* Less Urgent Panel Patients */}
				<PriorityTable 
					priority = {"Less Urgent"}
					color = {"success"}
					depId = {depId}
					patients = {patients.filter(a => a.priority === "Less Urgent")}
					userToken = {userToken}
					deadline = {60}
					nextPatient = {this.setNextPatient}
					refreshPatsInMainpage = {this.getDepartmentPatients}
				/>

				{/* Non Urgent Panel Patients */}
				<PriorityTable 
					priority = {"Non Urgent"}
					color = {"info"}
					depId = {depId}
					patients = {patients.filter(a => a.priority === "Non Urgent")}
					userToken = {userToken}
					deadline = {120}
					nextPatient = {this.setNextPatient}
					refreshPatsInMainpage = {this.getDepartmentPatients}
				/>
			</div>
		);
	}
}

Mainpage.propTypes = {
	userToken: PropTypes.string.isRequired
};

export default Mainpage;