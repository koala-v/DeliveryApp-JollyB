using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WebApi.ServiceModel.Tables
{
    public class Csbk1_with_Csbk2
    {
        public Csbk1 csbk1 { get; set; }
        public List<Csbk2> csbk2s { get;set;}
    }
}
