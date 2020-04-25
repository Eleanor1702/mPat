namespace Backend {
    public class GenericResponse {
        public string type { get; }
        public string message { get; }

        public GenericResponse(string newType, string newMessage) {
            type = newType;
            message = newMessage;
        }
    }
}