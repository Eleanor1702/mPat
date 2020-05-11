using System.Text.Json.Serialization;

namespace Backend {
    public class Organisation {
        [JsonIgnore]
        public long id { get; }
        public string name { get; }
        public string token { get; set; }

        public Organisation(long newId, string newName) {
            id = newId;
            name = newName;
        }
    }
}