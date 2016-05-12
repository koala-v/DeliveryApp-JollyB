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
        public string JobType { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string CustomerRefNo { get; set; }
        public string CompletedFlag { get; set; }  
        public System.DateTime DeliveryEndDateTime { get; set; }
        public System.DateTime EstimateDeliveryDateTime { get; set; }
        public string FromPostalCode { get; set; }
        public string FromName { get; set; }
        public string FromAddress1 { get; set; }
        public string FromAddress2 { get; set; }
        public string FromAddress3 { get; set; }
        public string FromAddress4 { get; set; }
        public int TotalPcs { get; set; }
        public string ToPostalCode { get; set; }
        public string ToName { get; set; }
        public string ToAddress1 { get; set; }
        public string ToAddress2 { get; set; }
        public string ToAddress3 { get; set; }
        public string ToAddress4 { get; set; }
        public string UomCode { get; set; }
        public string DriverCode { get; set; }





    }
}
