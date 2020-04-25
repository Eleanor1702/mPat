using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers {

    [ApiController]
    //Set the route where this controller is accessible
    [Route("patients")]

    public class PatientsController : ControllerBase {
        private static List<Patient> pats = new List<Patient>();

        [HttpPost]
        //"[FromBody]“ takes only one parameter. While our JSON doc is a compelete patient data
        //we set our paramter to a patient, so the system creates a patient directly with the 
        //data provided.
        //Note: Parameter labels in JSON doc should look the same as in class
        public void Post([FromBody] Patient patient) {
            pats.Add(patient);
        }

        [HttpGet]
        public List<Patient> Get() {
            return pats;
        }

        [HttpGet("{newId}")]
        public ActionResult<Patient> GetSingle(int newId) {
            try{
                return pats.Where(a => a.id == newId).First();
                
            } catch (InvalidOperationException) {
                //Return 404 Error, if no patient with id exist
                return NotFound();
            }
        }
    }
}