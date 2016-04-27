using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.ServiceModel.Tables
{
   public class Tobk1
    {
        public string BookingNo { get; set; }
        public Nullable<System.DateTime> DeliveryEndDateTime { get; set; }
        public int TotalPcs { get; set; }
        public string UOMCode { get; set; }      
    }
}
