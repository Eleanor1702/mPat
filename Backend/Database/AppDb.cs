using System;
using MySql.Data.MySqlClient;

namespace Backend {

    //IDisposable released unused resources
    public class AppDb : IDisposable {
        public MySqlConnection Connection { get; }

        public AppDb(String connectionString) {
            Connection = new MySqlConnection(connectionString);
        }

        public void Dispose() => Connection.Dispose();
    }
}