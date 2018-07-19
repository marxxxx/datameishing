
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;

namespace datamaishing.BrewTelemetryFunction
{
    public static class NegotiateFunction
    {
        [FunctionName("negotiate")]
        public static IActionResult Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")]HttpRequest req,
                                        [SignalRConnectionInfo(HubName = "broadcast", ConnectionStringSetting = "AzureSignalRConnectionString")]AzureSignalRConnectionInfo info,
                                        TraceWriter log)
        {
            return info != null
                ? (ActionResult)new OkObjectResult(info)
                : new NotFoundObjectResult("Failed to load SignalR Info.");
        }
    }
}
