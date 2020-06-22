using Backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace Backend.Controllers {

    [ApiController]
    //Set the route to be able to access the controller
    [Route("authentication")]
    public class AuthenticationController : ControllerBase {
        public AppDb Db { get; }

        public AuthenticationController(AppDb newDb) {
            Db = newDb;
        }

        [HttpPost]
        public IActionResult LogIn([FromBody] LoginRequest request) {
            OrganisationServices orgService = new OrganisationServices(Db);

            try {
                var org = orgService.FindByRegNrAndPassKey(request.registrationNr, request.passKey);
                if(org != null) {
                    return Ok(orgService.RegisterNewLogin(org));
                }

            } catch (MySqlException mySql) {
                System.Console.WriteLine("Developer Mode: " + mySql.Message);
                return StatusCode(500, new GenericResponse("Error!", "Please contact the administration"));
                
            } catch (QueryFailedException update) {
                System.Console.WriteLine("Developer Mode: " + update.Message);
                return BadRequest(new GenericResponse("Error!", "Please contact the administration"));
            }

            return Unauthorized(new GenericResponse("Error!", "Invalid login credentials!"));
        }
    }
}   