using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using datamaishing.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Newtonsoft.Json;
using WebPush;

namespace datamaishing.Brewstarter
{
    public static class ApprovalOchestrationFunction
    {
        private const string PushPublicKey = "BJp7bbqgPW3Y0U_O7hGzng2c7gENxgTFPM_LHbt3_88c3qoFxYI61LqWz2fWhJNsIbHZOcScyUybUbpU9gSS1Hs";
        private const string PushPrivateKey = "yPUw-LMY2-fMGbqGTEuR6VBai6AcSNjLaX5cQRreBF8";

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

                if (winner == approvalResponse)
                {
                    // send response to client
                    SendPushNotification(request.SubscriptionEndpoint, request.p256dh, request.auth,
                        "Beer approval", approvalResponse.Result ? "Beer is brewing" : "No beer for you!",
                        approvalResponse.Result);
                }
                else
                {
                    // timeout
                    SendPushNotification(request.SubscriptionEndpoint, request.p256dh, request.auth, 
                        "Timeout", "Brewmaster didn't give a shit about you.",
                        false);
                }

                if (!timeoutTask.IsCompleted)
                {
                    // All pending timers must be completed or cancelled before the function exits.
                    timeoutCts.Cancel();
                }
            }




        }

        private static void SendPushNotification(string subscriptionEndpoint, string p256dh, string auth, 
            string title, string body,
            bool result)
        {
            var webPushClient = new WebPushClient();
            var vapidDetails = new VapidDetails("mailto:brewmaster@datamaishing.com", PushPublicKey, PushPrivateKey);

            var message = new PushMessageModel()
            {
                notification = new NotificationModel()
                {
                    title = title,
                    body = body,
                    Result = result
                }
            };

            webPushClient.SendNotification(new PushSubscription(subscriptionEndpoint, p256dh, auth), JsonConvert.SerializeObject(message), vapidDetails);

        }
    }
}