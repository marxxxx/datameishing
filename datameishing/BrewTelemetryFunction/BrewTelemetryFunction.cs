
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;

namespace BrewTelemetryFunction
{
    public static class BrewTelemetryFunction
    {
        [FunctionName("BrewTelemetryFunction")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)]HttpRequest req,
            [SignalR(HubName = "broadcast", ConnectionStringSetting = "AzureSignalRConnectionString")]IAsyncCollector<SignalRMessage> signalRMessages,
            TraceWriter log)
        {
            log.Info("C# HTTP trigger function processed a request.");

            string requestBody = new StreamReader(req.Body).ReadToEnd();
            
            signalRMessages.AddAsync(new SignalRMessage() { Target = "brewTelemetry", Arguments = new object[] { requestBody } });

            return new OkResult();
        }
    }
}
