using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Backend.Models.Requests;

namespace Backend.Controllers {

    [ApiController]
    //Set the route where this controller is accessible
    [Route("departments/{depId}/patients")]
    public class PatientsController : ControllerBase {
		private AppDb Db { get; }
		private OrganisationServices orgService { get; }
		private DepartmentServices depService { get; }
		private PatientServices patService { get; }

		public PatientsController(AppDb newDb) {
			Db = newDb;
			orgService = new OrganisationServices(Db);
			depService = new DepartmentServices(Db);
			patService = new PatientServices(Db);
		}

		private IActionResult ValidateTokenAndExecute(long depId, Func<Department, IActionResult> action) {
			try{
				//Get Organisation token from header
				var token = Request.Headers["token"];
				//Check token validity
				var org = orgService.FindByToken(token);

				//Proceed only when a valid organisation is available
				if(org != null) {
					//Find requested Department
					var dep = depService.findAllDepartments(org).Where(a => a.id == depId).First();

					return action(dep);
				}

			//Catch Exceptions occured while selecting a department Id in action
			} catch (InvalidOperationException invalidOp) {
				Console.WriteLine("Debug Mode: " + invalidOp.Message);
				return NotFound();

			//Catch Exceptions realated to mysql commands
			}catch (MySqlException mySql) {
				Console.WriteLine("Debug Mode: " + mySql.Message);
				return StatusCode(500, new GenericResponse("Error!", "Please contact the administration"));

			//Catch Exceptions related to mysql parameter input failure
			} catch (QueryFailedException query) {
				Console.WriteLine("Debug Mode: " + query.Message);
				return BadRequest();
			}

			return Unauthorized(new GenericResponse("Error!", "You are not eligible to continue this request"));
		}

		[HttpGet]
		public IActionResult GetAllPatientsPerDepartment(long depId) {
			return ValidateTokenAndExecute(depId, (dep) => {
				//Look up database for all patients linked to this department
				return Ok(patService.findAllPatientsPerDepartment(dep));
			});
		}

		[HttpPost]
		public IActionResult CreatePatient(long depId, [FromBody] NewPatientRequest request) {
			return ValidateTokenAndExecute(depId, (dep) => {
				patService.createNewPatient(
					dep.id, request.firstName, request.lastName, request.details, request.isWIP, request.priority
				);
				return StatusCode(201);
			});
		}

		[HttpDelete("{patId}")]
		public IActionResult DeletePatient(long depId, long patId) {
			return ValidateTokenAndExecute(depId, (dep) => {
				patService.deletePatient(dep.id, patId);
				return NoContent();
			});
		}

		[HttpPut("{patId}")]
		public IActionResult UpdatePatient(long depId, long patId, [FromBody] NewPatientRequest request) {
			return ValidateTokenAndExecute(depId, (dep) => {
				patService.updatePatient(
					dep.id, patId, request.firstName, request.lastName, request.details, request.isWIP, request.priority
				);
				return NoContent();
			});
		}
    }
}