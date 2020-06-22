using System;
using System.Data;
using MySql.Data.MySqlClient;
using System.Security.Cryptography;

namespace Backend {
    public class OrganisationServices {
        public AppDb Db { get; }

        public OrganisationServices(AppDb newDb) {
            Db = newDb;
        }

        public Organisation FindByToken(string newToken) {
            return InitiateConnectionAndExecuteQuery((cmd) => {
                cmd.CommandText = @"SELECT Id, Name FROM Organisation
                                    WHERE Token = @newToken";

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@newToken",
                    DbType = DbType.StringFixedLength,
                    Value = newToken,
                });
            });
        }

        public Organisation FindByRegNrAndPassKey(string regNr, string pass) {
            return InitiateConnectionAndExecuteQuery((cmd) => {
                cmd.CommandText = @"SELECT Id, Name FROM Organisation 
                                WHERE RegistrationNr = @RegistrationNr 
                                AND PassKey = SHA2(@PassKey, 256)";

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@RegistrationNr",
                    DbType = DbType.StringFixedLength,
                    Value = regNr,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@PassKey",
                    DbType = DbType.StringFixedLength,
                    Value = pass,
                });
            });
        }

        private Organisation InitiateConnectionAndExecuteQuery(Action<MySqlCommand> action) {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand();

            action(cmd);

            var reader = cmd.ExecuteReader();

            if(reader.Read()) {
                var id = reader.GetInt64(0);
                var name = reader.GetString(1);
                Db.Connection.Close();

                return new Organisation(id, name);
            }

            Db.Connection.Close();
            return null;
        }

        public Organisation RegisterNewLogin(Organisation org) {
            org.token = GenerateToken();
            UpdateTokenAndLogin(org.id, org.token);
            return org;
        }

        private void UpdateTokenAndLogin(long id, string token) {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = @"UPDATE Organisation
                                SET Token = @token, LastLogin = NOW()
                                WHERE Id = @id";
            
            cmd.Parameters.Add(new MySqlParameter {
                ParameterName = "@token",
                DbType = DbType.StringFixedLength,
                Value = token
            });

            cmd.Parameters.Add(new MySqlParameter {
                ParameterName = "@id",
                DbType = DbType.StringFixedLength,
                Value = 123
            });

            var affectedRows = cmd.ExecuteNonQuery();
            Db.Connection.Close();

            if(affectedRows <= 0) {
                throw new QueryFailedException("Database update has not been successfully made!");
            }
        }

        private string GenerateToken() {
            RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();
            var byteArray = new byte[50];
            provider.GetBytes(byteArray);

            //convert to string
            var y = BitConverter.ToString(byteArray, 0);
            return BitConverter.ToString(byteArray, 0);
        }
    }
}