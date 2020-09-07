using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend {
	 
	public class QueuePositionCalculator {

		Dictionary<string, int> deadline = new Dictionary<string, int> () {
			{"Emergent", 15},
			{"Urgent", 30},
			{"Less Urgent", 60},
			{"Non Urgent", 120}
		};

		public QueuePositionCalculator() {}

		private bool isMaxWaitTimeBigger(Patient currPat, Patient otherPat) {
			return otherPat.createdAt.AddMinutes(deadline[otherPat.priority]) < currPat.createdAt.AddMinutes(deadline[currPat.priority]);
		}

		private bool isWipThresholdBigger(Patient pat, int wipThreshold) {
			return pat.createdAt.AddMinutes(deadline[pat.priority]) < DateTime.Now.AddMinutes(wipThreshold);
		}

		private bool isCreationTimeOlder(Patient currPat, Patient otherPat) {
			return otherPat.createdAt < currPat.createdAt;
		}

		public int calculatePatientPositionInQueue(List<Patient> departmentPatients, Patient currPat, Department dep) {
			List<Patient> patsBeforeCurrPat = new List<Patient>();

			//Check if patient is a 'Working in progress' Patient
			if(currPat.isWIP) {
				//Lookup all patients (other than currPat itself) that needs less MaxWaitingTime than the department threshhold
				var patsWithLessThreshold = departmentPatients.Where(a => a.id != currPat.id && a.isWIP == false)
																			.Where(a => isWipThresholdBigger(a, dep.wipThreshold)).ToList();

				//Lookup all wip patients with less creation time than currPat and merge result with
				//patsWithLessThreshold sequence
				patsBeforeCurrPat = patsWithLessThreshold.Concat(
					departmentPatients.Where(a => a != currPat && a.isWIP == true)
											.Where(a => isCreationTimeOlder(currPat, a))
				).ToList();

			}else{
				//Lookup all patients (other than currPat itself) that needs less MaxWaitingTime than current patient
				var patsWithLessMaxWaitTime = departmentPatients.Where(a => a.id != currPat.id && a.isWIP == false)
																				.Where(a => isMaxWaitTimeBigger(currPat, a)).ToList();

				//Check if department WipThreshold + NOW is bigger than currPat MaxWaitingTime
				//if false => all wip pats are included in patsBeforeCurrPat List
				//Otherwise none are included
				if(!isWipThresholdBigger(currPat, dep.wipThreshold)) {
					patsBeforeCurrPat = patsWithLessMaxWaitTime.Concat(
						departmentPatients.Where(a => a.id != currPat.id && a.isWIP == true)
					).ToList();

				}else{
					patsBeforeCurrPat = patsWithLessMaxWaitTime;
				}
			}

			//Length of List = pat position in Queue
			return patsBeforeCurrPat.Count;
		}
	}
}