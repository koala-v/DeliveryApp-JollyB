using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ServiceStack.ServiceHost;
using ServiceStack.OrmLite;

namespace WebApi.ServiceModel.DMS
{
    [Route("/dms/login/check", "Get")]
    public class Dms_Login : IReturn<CommonResponse>
    {
        public string DriverId { get; set; }
    }
    public class Dms_Login_Logic
    {
        public IDbConnectionFactory DbConnectionFactory { get; set; }
        public int LoginCheck(Dms_Login request)
        {
            int Result = -1;
            try
            {
                using (var db = DbConnectionFactory.OpenDbConnection("DMS"))
                {
                    Result = db.Scalar<int>(
                        "select * from Todr1 Where DriverCode={0}",
                        request.DriverId     
                                        
                        );
                }
            }
            catch
            {
                throw;
            }
            return Result;

        }
    }
}
