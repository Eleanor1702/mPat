using System.Data;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace Backend {
    public class UserServices {
        public AppDb Db { get;}

        public UserServices(AppDb db) {
            Db = db;
        }

        public bool CheckCredentials(User user) {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = @"SELECT 'NAME', 'PASSWORD' FROM `USERS` 
                                WHERE `NAME` = @NAME 
                                AND `PASSWORD`= @PASSWORD";

            cmd.Parameters.Add(new MySqlParameter {
                ParameterName = "@NAME",
                DbType = DbType.StringFixedLength,
                Value = user.userName,
            });

            cmd.Parameters.Add(new MySqlParameter {
                ParameterName = "@PASSWORD",
                DbType = DbType.StringFixedLength,
                Value = user.password,
            });

            var res = cmd.ExecuteReader();
            var status = res.HasRows;

            Db.Connection.Close();
            return status;
        }
    }
}