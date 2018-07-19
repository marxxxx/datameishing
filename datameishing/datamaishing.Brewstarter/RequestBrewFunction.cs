
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using datamaishing.Models;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Threading.Tasks;

namespace datamaishing.Brewstarter
{
    public static class RequestBrewFunction
    {
        [FunctionName("RequestBrewFunction")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)]BeerRequestModel req,
            [OrchestrationClient] DurableOrchestrationClient orchestrationClient,
            TraceWriter log)
        {
            log.Info("Requesting brew ...");

            var instanceId = await orchestrationClient.StartNewAsync("ApprovalOchestrationFunction", req);
            log.Info($"ApprovalOrchestration started with instance id {instanceId}");

            return new OkObjectResult(new { instanceId = instanceId });
        }
    }
}
