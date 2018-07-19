using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using datamaishing.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;

namespace datamaishing.Brewstarter
{
    public static class ApprovalOchestrationFunction
    {
        [FunctionName("ApprovalOchestrationFunction")]
        public static async Task RunOrchestrator(
            [OrchestrationTrigger] DurableOrchestrationContext context)
        {
            var request = context.GetInput<BeerRequestModel>();

            // Replace "hello" with the name of your Durable Activity Function.
            await context.CallActivityAsync("SendApprovalRequest", new BeerApprovalRequest(context.InstanceId, request));

            using (var timeoutCts = new CancellationTokenSource())
            {
                var timeoutTask = context.CreateTimer(context.CurrentUtcDateTime.AddMinutes(1), timeoutCts.Token);

                var approvalResponse = context.WaitForExternalEvent<bool>("ApprovalResponse");

                Task winner = await Task.WhenAny(approvalResponse, timeoutTask);

                if(winner == approvalResponse)
                {
                    // send response to client
                }
                else
                {
                    // timeout
                }

                if (!timeoutTask.IsCompleted)
                {
                    // All pending timers must be completed or cancelled before the function exits.
                    timeoutCts.Cancel();
                }
            }

          


        }

    }
}