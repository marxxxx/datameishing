using System;
using System.Collections.Generic;
using System.Text;

namespace datamaishing.Models
{
    public class BeerApprovalRequest
    {
        public string InstanceId { get; set; }
        public BeerRequestModel Request { get; set; }

        public BeerApprovalRequest(string instanceId, BeerRequestModel request)
        {
            this.InstanceId = instanceId;
            this.Request = request;
        }
    }
}
