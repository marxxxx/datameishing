using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using datamaishing.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace datamaishing.Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BeerController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<BeerModel>> Get()
        {
            return new BeerModel[] { new BeerModel(1, "Stiegl"), new BeerModel(2, "Gösser"), new BeerModel(3, "Zipfer"), new BeerModel(4, "Kaiser") };
        }


    }
}
