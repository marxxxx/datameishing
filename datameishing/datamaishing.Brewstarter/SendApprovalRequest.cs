using datamaishing.Models;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using SendGrid.Helpers.Mail;
using System;

namespace datamaishing.Brewstarter
{
    public static class SendApprovalRequest
    {
        [FunctionName("SendApprovalRequest")]
        public static void Run([ActivityTrigger]BeerApprovalRequest approvalRequest, 
            [SendGrid( ApiKey = "SendGridKey")] out SendGridMessage message,
            TraceWriter log)
        {

            string approvalLinkTemplate = Environment.GetEnvironmentVariable("ApprovalLinkTemplate");

            var request = approvalRequest.Request;
            string emailContent = string.Format(@"
<p>siehe Betreff</p>
<img src='https://www.rhein-zeitung.de/cms_media/module_img/3591/1795642_1_arslideimg_2-humpen-bier.jpg'>
<a href='{0}' style='color: green; font-weight: bold'>Approve</a>
<a href='{1}' style='color: red; font-weight: bold'>Reject</a>",
            string.Format(approvalLinkTemplate, approvalRequest.InstanceId, request.Name, true),
            string.Format(approvalLinkTemplate, approvalRequest.InstanceId, request.Name, false));

            message = new SendGridMessage();
            message.AddTo("markus.strobl@dataformers.at", "Braumeister");
            message.SetFrom(request.Email);
            message.SetSubject($"{request.Name} is requesting a {request.Receipt}");

            message.AddContent("text/html", emailContent);

        }
    }
}
