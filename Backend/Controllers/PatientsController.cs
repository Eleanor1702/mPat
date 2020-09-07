using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Backend.Models.Requests;

namespace Backend.Controllers {

    [ApiController]
    //Set the route where this controller is accessible
    [Route("departments/{urlDepId}/patients")]
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

		private IActionResult ValidateTokenAndExecute(long urlDepId, Func<long, IActionResult> action) {
			try{
				//Get Organisation token from header
				var token = Request.Headers["token"];
				//Check token validity
				var org = orgService.FindByToken(token);

				//Proceed only when a valid organisation is available
				if(org != null) {
					//Find requested Department
					var dep = depService.findAllDepartments(org).Where(a => a.id == urlDepId).First();

					return action(dep.id);
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
		public IActionResult GetAllPatientsPerDepartment(long urlDepId) {
			return ValidateTokenAndExecute(urlDepId, (depId) => {
				//Look up database for all patients linked to this department
				return Ok(patService.findAllPatientsPerDepartment(depId));
			});
		}

		[HttpPost]
		public IActionResult CreatePatient(long urlDepId, [FromBody] NewPatientRequest request) {
			return ValidateTokenAndExecute(urlDepId, (depId) => {
				var patId = patService.createNewPatient(
					depId, request.firstName, request.lastName, request.details, request.isWIP, request.priority
				);
				//Allow client to access the header 'patId' only for this action
				Response.Headers.Add("Access-Control-Expose-Headers", "patId");
				//return patient id in header
				Response.Headers.Add("patId", patId.ToString());
				return StatusCode(201);
			});
		}

		[HttpDelete("{patId}")]
		public IActionResult DeletePatient(long urlDepId, long patId) {
			return ValidateTokenAndExecute(urlDepId, (depId) => {
				patService.deletePatient(depId, patId);
				return NoContent();
			});
		}

		[HttpPut("{patId}")]
		public IActionResult UpdatePatient(long urlDepId, long patId, [FromBody] NewPatientRequest request) {
			return ValidateTokenAndExecute(urlDepId, (depId) => {
				patService.updatePatient(
					depId, patId, request.firstName, request.lastName, request.details, request.isWIP, request.priority
				);
				return NoContent();
			});
		}

		[HttpPut("{patId}/call")]
		public IActionResult callPatient(long urlDepId, long patId) {
			return ValidateTokenAndExecute(urlDepId, (depId) => {
				patService.callPatient(urlDepId, patId);
				return NoContent();
			});
		}
   }
}