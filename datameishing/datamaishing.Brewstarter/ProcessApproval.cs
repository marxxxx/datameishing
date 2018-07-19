
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace datamaishing.Brewstarter
{
    public static class ProcessApproval
    {
        [FunctionName("ProcessApproval")]
        public static async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)]HttpRequest req, 
            [OrchestrationClient]DurableOrchestrationClient orchestrationClient,
            TraceWriter log)
        {
            string name = req.Query["name"].First();
            bool result = Convert.ToBoolean(req.Query["result"].First());
            string instanceId = req.Query["instanceId"].First();
            log.Info($"Result of the brew request instance {instanceId} for {name} is {result}.");

            await orchestrationClient.RaiseEventAsync(instanceId, "ApprovalResponse", result);

            string responseString = $"<h3>Thank you for your response.</h3>";
            if(result == true)
            {
                responseString += $"<img src='https://i.kym-cdn.com/photos/images/newsfeed/000/516/588/c2f.jpg'><h2>{name} will get his beer soon.</h2>";
            }
            else
            {
                responseString += $"<img src='http://www.relatably.com/m/img/down-memes/1c1515b331f32c581358917aeeb0e71e993dc5198c5b84da07c43dcea81c5b15.jpg'><h2>{name} should go to hell.</h2>";
            }

            var contentResult = new ContentResult() { Content = responseString, ContentType = "text/html", StatusCode = 200 };
            return contentResult;
        }
    }
}
