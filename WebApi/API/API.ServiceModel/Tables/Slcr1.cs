using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.ServiceModel.Tables
{
    public class Slcr1
    {
        public string ReceiptNo { get; set; }
        public string JobNo { get; set; }
        public string BookingNo { get; set; }
        public string BookingLine { get; set; }
        public string Remark { get; set; }
        public string ReceiptType { get; set; }
        public decimal CashAmt { get; set; }
        public decimal ChequeAmt { get; set; }
        public decimal ReceiptAmt { get; set; }
        public DateTime ReceiptDate { get; set; }
        public Nullable<System.DateTime> ChequeDate { get; set; }
        public string UpdateBy { get; set; }
        public string CollectBy { get; set; }

        
    }
}
