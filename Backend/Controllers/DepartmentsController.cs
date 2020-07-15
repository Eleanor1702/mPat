using System;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Backend.Models.Requests;

namespace Backend.Controllers {

	[ApiController]
	//Set the route to be able to access the controller
    [Route("departments")]
    public class DepartmentsController : ControllerBase {
        private AppDb Db { get; }
        private OrganisationServices orgService { get; }
        private DepartmentServices depService { get; }

        public DepartmentsController(AppDb newDb) {
            Db = newDb;
            orgService = new OrganisationServices(Db);
            depService = new DepartmentServices(Db);
        }

        //show registered Departments
        [HttpGet]
        public IActionResult FindAllDepartments() {
            return ValidateTokenAndExecute((org) => {
                //LookUp Database for all departments linked to this token
                return Ok(depService.findAllDepartments(org)); 
            });
        }

        [HttpPost]
        public IActionResult CreateDepartment([FromBody] NewDepartmentRequest request) {
            return ValidateTokenAndExecute((org) => {
                depService.createNewDepartment(org.id, request.departmentName, request.wipThreshold);
                return StatusCode(201);
            });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDepartment(int id, [FromBody] NewDepartmentRequest request) {
            return ValidateTokenAndExecute((org) => {
                depService.updateDepartment(org.id, id, request.departmentName, request.wipThreshold);
                return NoContent();
            });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDepartment(int id) {
            return ValidateTokenAndExecute((org) => {
                depService.deleteDepartment(org.id, id);
                return NoContent();
            });
        }

        private IActionResult ValidateTokenAndExecute(Func<Organisation, IActionResult> action) {
            try{
                //Get Organisation token from header
                var token = Request.Headers["token"];
                //Check token validity
                var org = orgService.FindByToken(token);

                //Proceed only when a valid organisation is available
                if(org != null) {
                    return action(org);
                }

            } catch (MySqlException mySql) {
                Console.WriteLine("Debug Mode: " + mySql.Message);
                return StatusCode(500, new GenericResponse("Error!", "Please contact the administration"));
            
            } catch (QueryFailedException query) {
                Console.WriteLine("Debug Mode: " + query.Message);
                return BadRequest();
            }

            return Unauthorized(new GenericResponse("Error!", "You are not eligible to continue this request"));
        }
    }
}