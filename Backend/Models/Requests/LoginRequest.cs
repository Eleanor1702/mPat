namespace Backend.Models.Requests {

    //Login Request used for JSON Payload
    
    public class LoginRequest {
        public string registrationNr { get; set; }
        public string passKey { get; set; }
    }
}