
namespace Backend.Models.Requests {
	
	//New Patient Request used for JSON Payload
	public class NewPatientRequest {
		public string firstName { get; set; }
		public string lastName { get; set; }
		public string details { get; set; }
		public bool isWIP { get; set; }
		public string priority { get; set; }
	}
}