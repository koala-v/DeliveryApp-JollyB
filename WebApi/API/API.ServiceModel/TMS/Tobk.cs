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
    [Route("/tms/tobk1/update", "Get")] //update?CompletedFlag=
    [Route("/tms/tobk1", "Get")]      //tobk1?BookingNo=
    [Route("/tms/tobk2", "Get")]      //tobk2?BookingNo=
    public class Tobk : IReturn<CommonResponse>
    {
        public string RecordCount { get; set; }
        public string BookingNo { get; set; }
        public string CompletedFlag { get; set; }
        public string DriverCode { get; set; }

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
                        //  var strSQL = "SELECT t1.BookingNo,JobNo,CustomerCode,CustomerName,CustomerRefNo,CompletedFlag,DeliveryEndDateTime,TotalPcs,Toaddress1,Toaddress2,Toaddress3,Toaddress4,UOMCode" _
                        var strSQL = " SELECT t1.BookingNo,JobNo,isnull(CustomerCode,'' ) AS CustomerCode,isnull(CustomerName,'') as CustomerName," +
                            "isnull(CustomerRefNo,'') as CustomerRefNo,isnull(CompletedFlag,'') AS CompletedFlag,DeliveryEndDateTime,TotalPcs," +
                            "isnull(JobType,'')as JobType,EstimateDeliveryDateTime,isnull(FromPostalCode,'')as FromPostalCode,isnull(FromName,'') as FromName, isnull(FromAddress1,'')as FromAddress1 ,isnull(FromAddress2,'')as FromAddress2,isnull(FromAddress3,'')as FromAddress3,isnull(FromAddress4,'')as FromAddress4," +
                            "isnull(ToPostalCode,'') as ToPostalCode,isnull(ToName,'')as ToName,isnull(ToAddress1,'') as ToAddress1,isnull(ToAddress2,'') as ToAddress2," +
                            "isnull(ToAddress3,'') as ToAddress3,isnull(ToAddress4,'') as ToAddress4,isnull(UomCode,'')as UomCode" +
                            " FROM Tobk1 t1," +
                             "(SELECT TOP " + (count + 20) + "row_number() OVER(ORDER BY bookingNo ASC) n, bookingNo FROM Tobk1  " + strWhere + " ) t2 " +
                             "WHERE t1.bookingNo = t2.bookingNo AND StatusCode<> 'DEL' AND t2.n >" + count +
                             "ORDER BY t2.n ASC";
                        Result = db.Select<Tobk1>(strSQL);
                    }
                    else if (!string.IsNullOrEmpty(request.DriverCode))
                    {
                        var strSQL = "SELECT BookingNo, JobNo, isnull(CustomerCode,'' ) AS CustomerCode, isnull(CustomerName,'') as CustomerName," +
                           " isnull(CustomerRefNo, '') as CustomerRefNo,isnull(CompletedFlag, '') AS CompletedFlag, DeliveryEndDateTime, TotalPcs," +
                           " isnull(JobType,'')as JobType,EstimateDeliveryDateTime,isnull(FromPostalCode, '') as FromPostalCode,isnull(FromName, '') as FromName, isnull(FromAddress1, '') as FromAddress1 ,isnull(FromAddress2, '') as FromAddress2,isnull(FromAddress3, '') as FromAddress3,isnull(FromAddress4, '') as FromAddress4," +
                           " isnull(ToPostalCode, '') as ToPostalCode,isnull(ToName, '') as ToName,isnull(ToAddress1, '') as ToAddress1,isnull(ToAddress2, '') as ToAddress2," +
                           " isnull(ToAddress3, '') as ToAddress3,isnull(ToAddress4, '') as ToAddress4,isnull(UomCode, '') as UomCode" +
                           " FROM Tobk1 where DriverCode='" + request.DriverCode+"'";
                             Result = db.Select<Tobk1>(strSQL);
                    }
             
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

        public List<Tobk2> Get_Tobk2_List(Tobk request)
        {
            List<Tobk2> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {                         
                   if (!string.IsNullOrEmpty(request.BookingNo))
                    {
                       var strSQL = "select Tobk1.JobType,Tobk1.CustomerRefNo, Tobk1.TotalGrossWeight,Tobk1.TotalVolume, Tobk1.TotalChargeWeight, Tobk2.ContainerType ,Tobk2.DeliveryPcs,Tobk2.Pcs from Tobk2 left join  Tobk1 on  tobk2.bookingNo = Tobk1.BookingNo  where tobk1.BookingNo=" + request.BookingNo ;
                        Result = db.Select<Tobk2>(strSQL);
                   }
                }
            }
            catch { throw; }
            return Result;

        }
        public int update_tobk1(Tobk request)
        {
            int Result = -1;
             try
            {
                using (var db = DbConnectionFactory.OpenDbConnection())
                {
                    Result = db.Update<Tobk1>(
                                    new
                                    {
                                        CompletedFlag = request.CompletedFlag
                                      
                                    },
                                    p => p.BookingNo == request.BookingNo
                    );
                }
            }
            catch { throw; }
            return Result;
        }
    }
}
