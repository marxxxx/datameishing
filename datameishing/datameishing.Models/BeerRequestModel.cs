﻿using System;
using System.Collections.Generic;
using System.Text;

namespace datamaishing.Models
{
    public class BeerRequestModel
    {
        public DateTime Timestamp { get; set; }
        public string Name { get; set; }
        public string Email { get;set; }
        public string Receipt { get; set; }
    }
}
