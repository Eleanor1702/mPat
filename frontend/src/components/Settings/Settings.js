import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Settings.css";
import Department from "./Department";
import NewDepartmentModal from "./NewDepartmentModal";

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			departments: [],
			showModal: false
		};

		this.getDepartments = this.getDepartments.bind(this);
		this.showNewDepartmentModal = this.showNewDepartmentModal.bind(this);
		this.closeModalRequest = this.closeModalRequest.bind(this);
	}

	//LifeCycle method: is generated from react.component and is called when component is initially shown
	//Perfectly suitable for loading data, that will be displayed in page
	componentDidMount() {
		this.getDepartments();
	}

	showNewDepartmentModal() {
		console.log("clicked");
		this.setState ({
			showModal: true
		});
	}

	closeModalRequest(departmentCreated) {
		this.setState({
			showModal: false
		},
		() => {
			if(departmentCreated) {
				this.getDepartments();
			}
		});
	}
	
	getDepartments() {
		//To get all Department, a token verification is necessary. While this is a 'get' request
		//axios allow headers to pass data from Frontend to backend
		axios.get(
			"http://localhost:5000/departments", {
				headers: {
					token: this.props.userToken
				}
			}
		).then((departments) => {
			this.setState ({
				departments: departments.data
			});
		}).catch((reason) => {
			console.log(reason);
		});
	}

	render () {
		const { userToken } = this.props;
		const { departments, showModal } = this.state;

		return (
			<div>
				<section className="hero is-half-medium is-light is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title title-style">
								Departments
							</h1>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<div className="buttons has-addons is-right" onClick={this.showNewDepartmentModal}>
							<button className="button is-success">
								<span className="icon is-small is-left">
									<i className="fas fa-plus"></i>
								</span>
								<span>New Department</span>
							</button>
						</div>
						<NewDepartmentModal showModal = {showModal} closeModalRequest = {this.closeModalRequest} token = {userToken} />
						<table className="table is-bordered is-striped is-hoverable is-fullwidth">
							<thead>
								<tr>
									<th>Name</th>
									<th>WIP Threshold</th>
									<th>Created At</th>
									<th>Updated At</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{/* 'key' is important to identify each element und allow React to track changes of element 
                        	after each update */}
								{departments.map((department) => 
									<Department 
										/* This key is only to be used by React. It can't be used as a prop or so.It is useless */
										key = {department.id} 
										department = {department}
										refreshDepsInSettings = {this.getDepartments}
										token = {userToken}
									/>
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div>
		);
	}
}

Settings.propTypes = {
	userToken: PropTypes.string.isRequired
};
export default Settings;