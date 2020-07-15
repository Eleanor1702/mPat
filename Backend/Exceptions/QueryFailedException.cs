using System;

namespace Backend {

	//Exception describing an Error in sql queries 
    public class QueryFailedException : Exception {
        public QueryFailedException(string message) : base(message) {}
    }
}