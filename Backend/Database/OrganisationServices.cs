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

        public Organisation FindByRegNrAndPassKey(string regNr, string pass) {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand();

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

            var reader = cmd.ExecuteReader();

            if(reader.Read()) {
                var id = reader.GetInt64(0);
                var name = reader.GetString(1);
                Db.Connection.Close();

                return new Organisation(id, name);
            }

            Db.Connection.Close();
            throw new NotFoundException("Request credentials aren't correct!");
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
                Value = id
            });

            var affectedRows = cmd.ExecuteNonQuery();

            if(affectedRows <= 0) {
                throw new UpdateFailedException("Updating Token and LastLogin is failed! " +
                                                "Please check the database!");
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