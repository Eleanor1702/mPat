using System;

namespace Backend {
    public class UpdateFailedException : Exception {
        public UpdateFailedException(string message) : base(message) {}
    }
}