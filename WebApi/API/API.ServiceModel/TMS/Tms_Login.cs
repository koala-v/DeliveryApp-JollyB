using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;
using WebApi.ServiceModel.Tables;

namespace WebApi.ServiceModel.TMS
{
    [Route("/tms/login/check", "Get")]
    public class Tms_Login : IReturn<CommonResponse>
    {
        //public string UserId { get; set; }　　　//20160511 注释
        //public string Password { get; set; }
        //public string Md5Stamp { get; set; }
        public string ContactNo { get; set; }
        public string DriverCode { get; set; }
        public string DriverName { get; set; }
     
    }
    public class Tms_Login_Logic
    {
        public Boolean BlnContactNo = true;
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public int LoginCheck(Tms_Login request)
        {
            //int Result = -1; //20160511 注释
            //try
            //{
            //    using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
            //    {
            //        string strSql = "Select count(*) From Saus1 Where UserId='" + request.UserId + "' And Password=";
            //        if (string.IsNullOrEmpty(request.Md5Stamp))
            //        {
            //            strSql = strSql + "'" + request.Password + "'";
            //        }
            //        else
            //        {
            //            strSql = strSql + "'" + request.Md5Stamp + "'";
            //        }
            //        Result = db.Scalar<int>(strSql);
            //    }
            //}
            //catch { throw; }
            //return Result;
           
            int Result = -1;    //20160511 
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {
                    if (request.ContactNo != null && request.ContactNo.Length > 0)
                    { 
                        string strSql = "Select count(*) From Todr1 Where ContactNo1='" + request.ContactNo + "' ";
                        Result = db.Scalar<int>(strSql);
                        if (Result < 1)
                        {
                             strSql = "Select count(*) From Todr1 Where ContactNo2='" + request.ContactNo + "' ";
                            Result = db.Scalar<int>(strSql);
                            BlnContactNo = false;
                        }
                        else
                        { 
                            BlnContactNo = true;
                        }
                    }
                }
            }
            catch { throw; }
            return Result;

        }
   
            public List<Todr1> GetTodr1(Tms_Login request)
        {
            List<Todr1> Result = null;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
                {

                    var strSQL = "";
                    if (BlnContactNo == false)
                    {
                        strSQL = "select isnull(DriverCode,'') as  DriverCode,isnull(DriverName,'') as  DriverName from todr1 where ContactNo2=" + Modfunction.SQLSafeValue(request.ContactNo);
                        Result = db.Select<Todr1>(strSQL);
                    }
                    else {
                         strSQL = "select isnull(DriverCode,'') as  DriverCode,isnull(DriverName,'') as  DriverName from todr1 where ContactNo1=" + Modfunction.SQLSafeValue(request.ContactNo);
                        Result = db.Select<Todr1>(strSQL);
                    }
                   
                }
            }
            catch { throw; }
            return Result;

        }
            
            
            //string Result = "";
            //try {
            //    using (var db = DbConnectionFactory.OpenDbConnection("TMS"))
            //    {
            //        Result = db.Scalar<string>("select isnull(DriverCode,'') as  DriverCode,isnull(DriverName,'') as  DriverName from todr1 where ContactNo1=" + Modfunction.SQLSafeValue(request.ContactNo));
            //    }
            //}
            //catch { throw; }
            //return Result;
      
    }
}
