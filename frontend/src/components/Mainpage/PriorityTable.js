import React from "react";
import "./PriorityTable.css";
import Patient from "./Patient";
import PropTypes from "prop-types";

class PriorityTable extends React.Component {

	render() {
		const { patients, userToken, deadline, priority, color } = this.props;

		return (
			<article className={"panel is-" + color}>
				<p className="panel-heading level">
					<div className="level-right">
						<div className="level-item">	
							{priority} [Max. {deadline} Minutes]
						</div>
					</div>
					<div className="level-left">
						<div className="level-item">	
								Total of Patients: {patients.length}
						</div>
					</div>
				</p>
				<div className="panel-block">
					<table className="table is-hoverable is-fullwidth">
						<thead>
							<tr>
								<th className="col-width-15">First Name</th>
								<th className="col-width-15">Last Name</th>
								<th className="col-width-25">Details</th>
								<th className="col-width-25">Remaining Time</th>
								<th className="col-width-20">Actions</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient) =>
								<Patient
									key = {patient.id}
									patient = {patient}
									userToken = {userToken}
									deadline = {deadline}
								/>
							)}
						</tbody>
					</table>
				</div>
			</article>
		);
	}
}

PriorityTable.propTypes = {
	patients: PropTypes.array.isRequired,
	userToken: PropTypes.string.isRequired,
	deadline: PropTypes.number.isRequired,
	priority: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
};

export default PriorityTable;