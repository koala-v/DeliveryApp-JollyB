using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;

namespace WebApi.ServiceModel.TMS
{
    [Route("/tms/tobk1/sps", "Get")]
    [Route("/tms/tobk1", "Get")]
   public class Tobk : IReturn<CommonResponse>
    {
        public string RecordCount { get; set; }
    }
    public class Tobk_Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }

        public List<Tobk1> Get_Tobk1_List(Tobk request)
        {
            List<Tobk1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    string strSQL = "select BookingNo,DeliveryEndDateTime,TotalPcs,UOMCode  from tobk1 where StatusCode <>'DEL'";
                    Result = db.Select<Tobk1>(strSQL);
                }

            }
            catch { throw; }
            return Result;

        }

        public List<Tobk1> Get_Tobk1_SpsList(Tobk request)
        {
            List<Tobk1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    int count = int.Parse(request.RecordCount);
                    var strSQL = "SELECT r1.BookingNo,DeliveryEndDateTime,TotalPcs,UOMCode" +
                         " FROM Tobk1 r1," +
                         "(SELECT TOP " + (count + 20) + "row_number() OVER(ORDER BY bookingNo ASC) n, bookingNo FROM Tobk1 ) r2" +
                         "WHERE r1.bookingNo = r2.bookingNo AND StatusCode<> 'DEL' AND r2.n >" + count+
                         "ORDER BY r2.n ASC";
                    Result = db.Select<Tobk1>(strSQL);

                }

            }
            catch { throw; }
            return Result;

        }
    }
}
