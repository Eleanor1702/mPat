using System;
using System.Collections.Generic;
using System.Data;
using MySql.Data.MySqlClient;

namespace Backend {
    public class DepartmentServices {
        public AppDb Db { get; }

        public DepartmentServices(AppDb newDb) {
            Db = newDb;
        }

        public List<Department> findAllDepartments(Organisation org) {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand();

            cmd.CommandText = @"SELECT Id, Name, WIPThreshold, CreatedAt, UpdatedAt
                                FROM Department
                                WHERE OrganisationId = @orgId";

            cmd.Parameters.Add(new MySqlParameter {
                ParameterName = "@orgId",
                DbType = DbType.StringFixedLength,
                Value = org.id,
            });

            var reader = cmd.ExecuteReader();
            var departments = new List<Department>();

            while(reader.Read()) {
                var id = reader.GetInt64(0);
                var name = reader.GetString(1);
                var wipThreshold = reader.GetUInt16(2);
                var createdAt = reader.GetDateTime(3).ToString();
                var updatedAt = reader.GetDateTime(4).ToString();
                
                departments.Add(new Department(org.id, id, name, wipThreshold, createdAt, updatedAt));
            }

            Db.Connection.Close();
            return departments;
        }

        public void createNewDepartment(long organisationId, string departmentName, int wipThreshold) {
            InitiateConnectionAndExecuteQuery((cmd) => {
                cmd.CommandText = @"INSERT INTO Department (OrganisationId, Name, WipThreshold)
                                    VALUES (@orgId, @name, @wip)";
                
                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@orgId",
                    DbType = DbType.StringFixedLength,
                    Value = organisationId,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@name",
                    DbType = DbType.StringFixedLength,
                    Value = departmentName,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@wip",
                    DbType = DbType.StringFixedLength,
                    Value = wipThreshold,
                });
            });
        }

        public void updateDepartment(long orgId, long id, string depName, int wipThreshold) {
            InitiateConnectionAndExecuteQuery((cmd) => {
                cmd.CommandText = @"UPDATE Department 
                                SET Name = @depName,
                                    WipThreshold = @wipThreshold
                                WHERE Id = @id
                                AND OrganisationId = @orgId";
            
                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@depName",
                    DbType = DbType.StringFixedLength,
                    Value = depName,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@wipThreshold",
                    DbType = DbType.StringFixedLength,
                    Value = wipThreshold,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@id",
                    DbType = DbType.StringFixedLength,
                    Value = id,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@orgId",
                    DbType = DbType.StringFixedLength,
                    Value = orgId,
                });
            });
        }

        public void deleteDepartment(long orgId, long id) {
            InitiateConnectionAndExecuteQuery((cmd) => {
                cmd.CommandText = @"DELETE FROM Department
                                WHERE Id = @id
                                AND OrganisationId = @orgId";

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@id",
                    DbType = DbType.StringFixedLength,
                    Value = id,
                });

                cmd.Parameters.Add(new MySqlParameter {
                    ParameterName = "@orgId",
                    DbType = DbType.StringFixedLength,
                    Value = orgId,
                });
            });
        }

        private void InitiateConnectionAndExecuteQuery(Action<MySqlCommand> action) {
            Db.Connection.Open();
            var cmd = Db.Connection.CreateCommand();

            action(cmd);

            var rowAffected = cmd.ExecuteNonQuery();
            Db.Connection.Close();

            if(rowAffected <= 0) {
                throw new QueryFailedException("Database update has not been successfully made!");
            }
        }
    }
}