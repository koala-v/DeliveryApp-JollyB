using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.ServiceModel.Tables
{
  public  class Csbk2
    {
        public string BookingNo { get; set; }
        public string JobNo { get; set; }
        public int LineItemNo { get; set; }
        public int TrxNo { get; set; }
        public string StatusCode { get; set; }    
    
        public string  BoxCode { get; set; }
        public int Pcs { get; set; }

        public decimal UnitRate { get; set; }
        public int CollectedPcs { get; set; }    
      //  public decimal CollectedAmt { get; set; }
        public string AttachmentFlag { get; set; }
        public int AddQty { get; set; }



    }
}
