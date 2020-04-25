using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers {

    [ApiController]
    //Set the route where this controller is accessible
    [Route("authentication")]
    public class AuthenticationController : ControllerBase {
        public AppDb Db { get; }

        public AuthenticationController(AppDb newDb) {
            Db = newDb;
        }

        [HttpPost]
        public GenericResponse LogIn([FromBody] User user) {
            UserServices userServices = new UserServices(Db);

            if (userServices.CheckCredentials(user)) {
                return new GenericResponse("SUCCESS", "Correct log in!");
            }

            return new GenericResponse("ERROR", "incorrect log in");
        }
    }
}   