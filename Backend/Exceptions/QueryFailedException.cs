using System;

namespace Backend {
    public class QueryFailedException : Exception {
        public QueryFailedException(string message) : base(message) {}
    }
}