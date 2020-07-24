import React from "react";
import "./PriorityTable.css";
import Patient from "./Patient";
import PropTypes from "prop-types";

class WIPTable extends React.Component {

	render() {
		const { patients, userToken, type, color, depId } = this.props;

		return (
			<article className={"panel is-" + color}>
				<div className="panel-heading level">
					<div className="level-right">
						<div className="level-item">	
							{type}
						</div>
					</div>
					<div className="level-left">
						<div className="level-item">	
								Total of Patients: {patients.length}
						</div>
					</div>
				</div>
				<div className="panel-block">
					<table className="table is-hoverable is-fullwidth">
						<thead>
							<tr>
								<th className="col-width-15">First Name</th>
								<th className="col-width-15">Last Name</th>
								<th className="col-width-30">Details</th>
								<th className="col-width-20">Actions</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient) =>
								<Patient
									key = {patient.id}
									depId = {depId}
									isWIPTable = {true}
									patient = {patient}
									userToken = {userToken}
									nextPatient = {this.props.nextPatient}
									refreshPatsInMainpage = {this.props.refreshPatsInMainpage}
								/>
							)}
						</tbody>
					</table>
				</div>
			</article>
		);
	}
}

WIPTable.propTypes = {
	patients: PropTypes.array.isRequired,
	userToken: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	nextPatient: PropTypes.func.isRequired,
	depId: PropTypes.number.isRequired,
	refreshPatsInMainpage: PropTypes.func.isRequired
};

export default WIPTable;