using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.ServiceModel.Tables
{
   public class Tobk1
    {
        public string BookingNo { get; set; }
        public string JobNo { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string CustomerRefNo { get; set; }
        public Nullable<System.DateTime> DeliveryEndDateTime { get; set; }
        public int TotalPcs { get; set; }    
        public string ToAddress1 { get; set; }
        public string ToAddress2 { get; set; }
        public string ToAddress3 { get; set; }
        public string ToAddress4 { get; set; }
        public string UOMCode { get; set; }
    }
}
