import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class DeleteWarningModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			processRequested: false
		};

		this.handleDeletionClick = this.handleDeletionClick.bind(this);
		this.requestClosing = this.requestClosing.bind(this);
		this.requestDeletion = this.requestDeletion.bind(this);
	}

	//The boolean 'patientDeleted' serves giving a hint wether the Modal is closed through 'cancel'
	//or after deleting a new department and a refresh is needed
	//True => Department deleted, Refresh is needed
	//False => Process was interrupted, no Refresh needed
	requestClosing(patientDeleted) {
		const { modalClosingRequest } = this.props;
		this.setState ({
			processRequested: false
		}, 
		() => {
			modalClosingRequest("DeleteWarningModal", patientDeleted);
		});
	}

	requestDeletion() {
		const { depId, patId, token } = this.props;
		axios.delete("http://localhost:5000/departments/" + depId + "/patients/" + patId, {
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

	handleDeletionClick() {
		this.setState ({
			processRequested: true
		},
		() => this.requestDeletion());
	}

	render() {
		const { showModal, patName } = this.props;
		const { processRequested } = this.state;

		return (
			<div className={`modal ${showModal ? "is-active" : ""}`}>
				<div className="modal-background"></div>
				<div className="modal-content">
					<header className="modal-card-head">
						<p className="modal-card-title">Confirm Deletion</p>
					</header>
					<section className="modal-card-body">
						<div className="field">
							<p className="is-size-5">Are you sure you want to delete the patient <strong>{patName}</strong> ?</p>
							<br />
							<p>This action cannot be undone. This will permanently delete the patient and all associated data to it!</p>
						</div>
					</section>
					<footer className="modal-card-foot display-block">
						<div className="buttons is-right">
							<button 
								className={`button is-danger ${processRequested ? "is-loading" : ""}`}
								onClick={this.handleDeletionClick}
							>
								Delete Patient
							</button>
							{/* To allow calling a function with a specific parameter as e component event, 
							a lambda expression is needed. It call the function needed and allows providing 
							the needed parameters, like so: () => this.testFunc(para) */}
							<button className="button" onClick={() => this.requestClosing(false)}>Cancel</button>
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

DeleteWarningModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	patName: PropTypes.string.isRequired,
	modalClosingRequest: PropTypes.func.isRequired,
	depId: PropTypes.number.isRequired,
	patId: PropTypes.number.isRequired,
	token: PropTypes.string.isRequired
};

export default DeleteWarningModal;