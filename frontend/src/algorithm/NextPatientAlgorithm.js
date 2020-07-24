import moment from "moment";

const getPriorityDeadline = (priority) => {
	switch(priority) {
		case "Emergent":
			return 15;

		case "Urgent":
			return 30;

		case "Less Urgent":
			return 60;

		case "Non Urgent":
			return 120;

		default:
			break;
	}
};

const calculateRemainingTime = (patient) => {
	const deadline = getPriorityDeadline(patient.priority);
	const maxTime = moment(patient.createdAt).add(deadline, "minutes");
	return maxTime.diff(moment(), "seconds");
};

const getUrgentPatientToCall = (patients, DepWipThreshold) => {
	return patients
		.filter(a => a.isWIP === false && calculateRemainingTime(a) < (DepWipThreshold * 60))
		.sort((a,b) => calculateRemainingTime(a) - calculateRemainingTime(b));
};

const getWIPPatientToCall = (patients) => {
	return patients
		.filter(a => a.isWIP === true)
		.sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
};

const getPatToCall = (patients) => {
	return patients
		.filter(a => a.isWIP === false)
		.sort((a, b) => calculateRemainingTime(a) - calculateRemainingTime(b));
};

const getNextEligiblePatient = (patients, DepWipThreshold) => {
	//Department threshold in minutes for accurate calculation
	const urgentPatToCall = getUrgentPatientToCall(patients, DepWipThreshold);

	//If the urgentPatToCall is empty, then a WIP Patient to be called next
	if(urgentPatToCall.length > 0) {
		return urgentPatToCall[0];
	}

	const wipPatToCall = getWIPPatientToCall(patients);
	if(wipPatToCall.length > 0) {
		return wipPatToCall[0];
	}

	const patToCall = getPatToCall(patients);
	return patToCall[0];
};

export default getNextEligiblePatient;