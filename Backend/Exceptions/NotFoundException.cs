using System;

namespace Backend {
    public class NotFoundException : Exception {
        public NotFoundException(string message) : base(message) {}
    }
}