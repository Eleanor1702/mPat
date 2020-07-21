import React from "react";
import PropTypes from "prop-types";
import "./Department.css";
import DeleteWarningModal from "./Modal/DeleteWarningModal.js";
import EditModal from "./Modal/EditModal.js";

/* Represents Department object components, to be displayed in Settings */

class Department extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDeleteWarning: false,
			showEditModal: false
		};

		this.showEditModal = this.showEditModal.bind(this);
		this.showDeleteWarningModal = this.showDeleteWarningModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	showDeleteWarningModal() {
		this.setState ({
			showDeleteWarning: true
		});
	}

	showEditModal() {
		this.setState ({
			showEditModal: true
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

		const { refreshDepsInSettings } = this.props;
		if(changeOccured) {
			refreshDepsInSettings();
		}
	}

	render() {
		const { showDeleteWarning, showEditModal } = this.state;
		//Extracting properties from nested object
		//obj = this.props, nested obj = department, properties = {name, wip, createTime, updateTime}
		//!Caution: properties name should match requested-data labelling from backend, otherwise JSON won't recognize the
		//properties and wont list the data correctly, resulting in an empty table.
		const { 
			department: { 
				id, name, wipThreshold, createdAt, updatedAt
			},
			token
		} = this.props;

		return (
			<tr>
				<td>{name}</td>
				<td>{wipThreshold}</td>
				<td>{createdAt}</td>
				<td>{updatedAt}</td>
				<td>
					<button 
						className="button is-small is-right has-mr-2per is-49per-width"
						onClick={this.showEditModal}
					>
						Edit
					</button>
					<EditModal
						showModal = {showEditModal}
						modalClosingRequest = {this.closeModal}
						token = {token}
						depId = {id}
						depName = {name}
						wipThreshold = {wipThreshold}
					/>
					<button 
						className="button is-small is-right is-danger is-49per-width"
						onClick={this.showDeleteWarningModal}
					>
						Delete
					</button>
					<DeleteWarningModal 
						showModal = {showDeleteWarning} 
						depName = {name}
						depId = {id}
						token = {token}
						modalClosingRequest = {this.closeModal}
					/>
				</td>
			</tr>
		);
	}
}

Department.propTypes =  {
	department: PropTypes.object.isRequired,
	refreshDepsInSettings: PropTypes.func.isRequired,
	token: PropTypes.string.isRequired
};

export default Department;