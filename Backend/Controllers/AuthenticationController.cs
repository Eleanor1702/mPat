using Microsoft.AspNetCore.Mvc;

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
            OrganisationServices organisationService = new OrganisationServices(Db);

            try {
                var org = organisationService.FindByRegNrAndPassKey(request.registrationNr, request.passKey);
                return Ok(organisationService.RegisterNewLogin(org));

            } catch (NotFoundException notFound) {
                System.Console.WriteLine("Developer Mode: " + notFound.Message);
                //TODO: front end reaction
                return Unauthorized(new GenericResponse("error", "Invalid login credentials"));

            } catch (UpdateFailedException update) {
                System.Console.WriteLine("Developer Mode: " + update.Message);
                //TODO: front end reaction
                return Unauthorized(new GenericResponse("error", "Invalid login credentials"));
            }
        }
    }
}   