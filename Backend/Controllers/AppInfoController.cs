using System;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers {
	 
	[ApiController]
	//Set the route where this controller is accessible
   [Route("patients/{urlPatId}")]

	public class AppInfoController : ControllerBase {
		private AppDb Db { get; }
		private OrganisationServices orgService { get; }
		private DepartmentServices depService { get; }
		private PatientServices patService { get; }
		private QueuePositionCalculator queueCalc { get; }

		public AppInfoController(AppDb newDb) {
			Db = newDb;
			orgService = new OrganisationServices(Db);
			depService = new DepartmentServices(Db);
			patService = new PatientServices(Db);
			queueCalc = new QueuePositionCalculator();
		}

		[HttpGet]
		public IActionResult getPatientInfoById(long urlPatId) {
			try {
				var pat = patService.findPatientById(urlPatId);
				var patList = patService.findAllPatientsPerDepartment(pat.departmentId);
				var dep = depService.findDepartmentById(pat.departmentId);

				var patPosition = queueCalc.calculatePatientPositionInQueue(patList, pat, dep);

				return Ok(new AppInfoResponse(patPosition, pat.isWIP, pat.priority, pat.createdAt, pat.isCalled));

			} catch (Exception e) {
				Console.WriteLine(e.Message);
				return BadRequest();
			}
		}
	}
}
