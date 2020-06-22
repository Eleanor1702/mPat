namespace Backend.Models.Requests {

    //New Department Request used for JSON Payload
    
    public class NewDepartmentRequest {
        public string departmentName { get; set; }
        public int wipThreshold { get; set; }
    }
}