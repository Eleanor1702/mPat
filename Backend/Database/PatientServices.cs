using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySql.Data.MySqlClient;

namespace Backend {
	public class PatientServices {
		public AppDb Db { get; }

		public PatientServices(AppDb newDb) {
			Db = newDb;
		}

		public List<Patient> findAllPatientsPerDepartment(long depId) {
			Db.Connection.Open();
			var cmd = Db.Connection.CreateCommand();

			cmd.CommandText = @"
										SELECT Id, FirstName, LastName, Details, IsWIP, Priority, CreatedAt, UpdatedAt
										FROM Patient
										WHERE DepartmentId = @depId
									";

			cmd.Parameters.Add(new MySqlParameter {
				ParameterName = "@depId",
				DbType = DbType.StringFixedLength,
				Value = depId,
			});

			var reader = cmd.ExecuteReader();
			var patients = new List<Patient>();

			while(reader.Read()) {
				var id = reader.GetInt64(0);
				var fristName = reader.GetString(1);
				var lastName = reader.GetString(2);
				var details = reader.GetString(3);
				var isWIPValue = reader.GetBoolean(4);
				var priority = reader.GetString(5);
				var createdAt = reader.GetDateTime(6);
				var updatedAt = reader.GetDateTime(7);

				patients.Add(
					new Patient(
						depId, id, fristName, lastName, details,
						isWIPValue, priority, createdAt, updatedAt
					)
				);
			}

			Db.Connection.Close();
			return patients;
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

		public long createNewPatient(
			long departmentId, string firstName, string lastName, string details, bool isWIP, string priority
		) {
			InitiateConnectionAndExecuteQuery((cmd) => {
				cmd.CommandText = @"
					INSERT INTO Patient (
						DepartmentId, FirstName, LastName, Details,
						IsWIP, Priority
					)
					VALUES (
						@depId, @firstName, @lastName, @details,
						@isWIP, @priority
					)
				";
				
				MySqlParameter[] parameters = {
					new MySqlParameter("@depId", departmentId),
					new MySqlParameter("@firstName", firstName),
					new MySqlParameter("@lastName", lastName),
					new MySqlParameter("@details", details),
					new MySqlParameter("@isWIP", isWIP),
					new MySqlParameter("@priority", priority)
				};
				
				foreach (var parameter in parameters) {
					cmd.Parameters.Add(parameter);	 
				}
			});

			var patientsPerDepartment = findAllPatientsPerDepartment(departmentId);
			return patientsPerDepartment.Where(
				a => 
					a.firstName == firstName && 
					a.lastName == lastName &&
					a.details == details &&
					a.isWIP == isWIP &&
					a.priority == priority
			).Last().id;
		}

		public void deletePatient(long departmentId, long id) {
			InitiateConnectionAndExecuteQuery((cmd) => {
				cmd.CommandText = @"
					DELETE FROM Patient
					WHERE Id = @id
					AND DepartmentId = @depId
				";

				MySqlParameter[] parameters = {
					new MySqlParameter("@id", id),
					new MySqlParameter("@depId", departmentId)
				};

				foreach (var parameter in parameters) {
					 cmd.Parameters.Add(parameter);
				}
			});
		}

		public void updatePatient(
			long departmentId, long id, string firstName, string lastName, string details, bool isWIP, string priority
		) {
			InitiateConnectionAndExecuteQuery((cmd) => {
				cmd.CommandText = @"
					UPDATE Patient
					SET
						FirstName = @firstName,
						LastName = @lastName,
						Details = @details,
						IsWIP = @isWIP,
						Priority = @priority
					WHERE Id = @id
					AND DepartmentId = @depId
				";

				MySqlParameter[] parameters = {
					new MySqlParameter("@firstName", firstName),
					new MySqlParameter("@lastName", lastName),
					new MySqlParameter("@details", details),
					new MySqlParameter("@isWIP", isWIP),
					new MySqlParameter("@priority", priority),
					new MySqlParameter("@id", id),
					new MySqlParameter("@depId", departmentId)
				};

				foreach(var parameter in parameters) {
					cmd.Parameters.Add(parameter);
				}
			});
		}
	}
}