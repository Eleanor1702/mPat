import React from "react";
import "./Mainpage.css";
import PriorityTable from "./PriorityTable";
import PropTypes from "prop-types";
import axios from "axios";

class Mainpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			departments: [],
			depId: 0,
			patients: []
		};

		this.getDepartments = this.getDepartments.bind(this);
		this.setDepartmentId = this.setDepartmentId.bind(this);
		this.getDepartmentPatients = this.getDepartmentPatients.bind(this);
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
			});
			this.getDepartmentPatients();

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
		const { departments, patients } = this.state;

		return (
			<div className="container is-fluid mt-5">
				<div className="columns is-mobile">
					<div className="column is-one-third is-offset-one-third">
						<button className="button is-info is-size-5 has-icons-left has-text-weight-medium is-fullwidth pt-4 pb-6">
							<span className="icon mr-2">
								<i className="fas fa-user-alt"></i>
							</span>
							Next Patient: Max Müller
						</button>
					</div>
				</div>

				<div className="columns">
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
							<button className="button is-link" onClick={this.getDepartmentPatients}>
								<span className="icon mr-2">
									<i className="fas fa-redo"></i>
								</span>
								<span>Refresh Patients</span>
							</button>
							<button className="button is-success">
								<span className="icon mr-2">
									<i className="fas fa-user-plus"></i>
								</span>
								<span>Add New Patient</span>
							</button>
						</div>
					</div>
				</div>

				{/* Emergent Panel Patients */}
				<PriorityTable 
					priority = {"Emergent"}
					color = {"danger"}
					patients = {patients.filter(a => a.priority === "Emergent")}
					userToken = {userToken}
					deadline = {15}
				/>

				{/* Urgent Panel Patients */}
				<PriorityTable 
					priority = {"Urgent"}
					color = {"warning"}
					patients = {patients.filter(a => a.priority === "Urgent")}
					userToken = {userToken}
					deadline = {30}
				/>

				{/* Less Urgent Panel Patients */}
				<PriorityTable 
					priority = {"Less Urgent"}
					color = {"success"}
					patients = {patients.filter(a => a.priority === "Less Urgent")}
					userToken = {userToken}
					deadline = {60}
				/>

				{/* Non Urgent Panel Patients */}
				<PriorityTable 
					priority = {"Non Urgent"}
					color = {"info"}
					patients = {patients.filter(a => a.priority === "Non Urgent")}
					userToken = {userToken}
					deadline = {120}
				/>
			</div>
		);
	}
}

Mainpage.propTypes = {
	userToken: PropTypes.string.isRequired
};

export default Mainpage;