using System.Text.Json.Serialization;

namespace Backend {
    public class Department {

        [JsonIgnore]
        public long organisationId { get; }
        public long id { get; }
        public string name { get; }
        public int wipThreshold { get; }
        public string createdAt { get; }
        public string updatedAt { get; }
        
        public Department(long orgId, long newId, string newName, int newWIP, string createTime, string updateTime){
            organisationId = orgId;
            id = newId;
            name = newName;
            wipThreshold = newWIP;
            createdAt = createTime;
            updatedAt = updateTime;
        }
    }
}