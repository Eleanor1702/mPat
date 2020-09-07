using System;
using System.Text.Json.Serialization;

namespace  Backend {
	public class AppInfoResponse {
		public int patPosition { get; }
		public bool isWIP { get; }
		public string priority { get; }
		public DateTime createdAt { get; }
		public bool isCalled { get; }

		public AppInfoResponse(
			int position, bool isWip, string newPriority, DateTime newCreatedAt, bool isCalledValue
		) {
			patPosition = position;
			isWIP = isWip;
			priority = newPriority;
			createdAt = newCreatedAt;
			isCalled = isCalledValue;
		}
	}
}
