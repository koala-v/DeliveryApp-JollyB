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
    [Route("/tms/tobk1/sps", "Get")]  // sps?RecordCount=
    [Route("/tms/tobk1", "Get")]      //tobk1?BookingNo=
    public class Tobk : IReturn<CommonResponse>
    {
        public string RecordCount { get; set; }
        public string BookingNo { get; set; }
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
                    int count = 0;
                    if (!string.IsNullOrEmpty(request.RecordCount))
                    {
                        count = int.Parse(request.RecordCount);
                    }
                    string strWhere = "";
                    if (!string.IsNullOrEmpty(request.BookingNo))
                    {

                        strWhere = "Where BookingNo='" + request.BookingNo + "'";

                    }
                    var strSQL = "SELECT t1.BookingNo,JobNo,CustomerCode,CustomerName,CustomerRefNo,DeliveryEndDateTime,TotalPcs,Toaddress1,Toaddress2,Toaddress3,Toaddress4,UOMCode" +
                         " FROM Tobk1 t1," +
                         "(SELECT TOP " + (count + 20) + "row_number() OVER(ORDER BY bookingNo ASC) n, bookingNo FROM Tobk1  " + strWhere + " ) t2 " +
                         "WHERE t1.bookingNo = t2.bookingNo AND StatusCode<> 'DEL' AND t2.n >" + count +
                         "ORDER BY t2.n ASC";
                    Result = db.Select<Tobk1>(strSQL);

                }
                //using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                //{ 
                //    string strSQL = "select BookingNo,JobNo,CustomerCode,CustomerName,CustomerRefNo,DeliveryEndDateTime,TotalPcs,Toaddress1,Toaddress2,Toaddress3,Toaddress4,UOMCode  from tobk1 where StatusCode <>'DEL'";
                //    Result = db.Select<Tobk1>(strSQL);
                //}

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
                    int count = 0;
                    if (!string.IsNullOrEmpty(request.RecordCount))
                    {
                        count = int.Parse(request.RecordCount);
                    }             
                    string strWhere = "";
                    if (!string.IsNullOrEmpty(request.BookingNo))
                    {

                        strWhere = "Where BookingNo='" + request.BookingNo + "'";
                      
                    }
                    var strSQL = "SELECT t1.BookingNo,JobNo,CustomerCode,CustomerName,CustomerRefNo,DeliveryEndDateTime,TotalPcs,Toaddress1,Toaddress2,Toaddress3,Toaddress4,UOMCode" +
                         " FROM Tobk1 t1," +
                         "(SELECT TOP " + (count + 20) + "row_number() OVER(ORDER BY bookingNo ASC) n, bookingNo FROM Tobk1  "+ strWhere +" ) t2 " +
                         "WHERE t1.bookingNo = t2.bookingNo AND StatusCode<> 'DEL' AND t2.n >" + count+
                         "ORDER BY t2.n ASC";
                    Result = db.Select<Tobk1>(strSQL);

                }

            }
            catch { throw; }
            return Result;

        }
    }
}
