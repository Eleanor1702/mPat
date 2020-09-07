using System;
using System.Text.Json.Serialization;

namespace Backend {
	public class Patient {

		[JsonIgnore]
		public long departmentId { get; }
		public long id { get; }
		public string firstName { get; }
		public string lastName { get; }
		public string details { get; }
		public bool isWIP { get; }
		public string priority { get; }
		public DateTime createdAt { get; }
		public DateTime updatedAt { get; }

		public bool isCalled { get; }

		public Patient (
			long depId, long newId, string newFirstName, string newLastName, string newDetails, 
			bool isWIPValue, string newPriority, DateTime createTime, DateTime updateTime,
			bool isCalledValue
		) {
			departmentId = depId;
			id = newId;
			firstName = newFirstName;
			lastName = newLastName;
			details = newDetails;
			isWIP = isWIPValue;
			priority = newPriority;
			createdAt = createTime;
			updatedAt = updateTime;
			isCalled = isCalledValue;
		}
	}
}