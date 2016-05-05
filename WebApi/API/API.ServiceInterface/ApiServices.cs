using System;
using System.IO;
using System.Web;
using System.Net;
using System.Linq;
using System.Text;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.Common.Web;
using ServiceStack.ServiceHost;
using ServiceStack.ServiceInterface;
using WebApi.ServiceModel;
using WebApi.ServiceModel.TMS;
using WebApi.ServiceModel.Utils;
using WebApi.ServiceInterface.TMS;
using File = System.IO.File;
using System.Reflection;

namespace WebApi.ServiceInterface
{
    public class ApiServices : Service
    {        
        public Auth auth { get; set; }
								#region TMS
								public ServiceModel.TMS.Tms_Login_Logic Dms_Login_Logic { get; set; }
								public object Any(ServiceModel.TMS.Tms_Login request)
								{
												CommonResponse ecr = new CommonResponse();
												ecr.initial();
												try
												{
																ServiceInterface.TMS.LoginService ls = new ServiceInterface.TMS.LoginService();
																ls.initial(auth, request, Dms_Login_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);
												}
												catch (Exception ex) { cr(ecr, ex); }
												return ecr;
								}

        public ServiceModel.TMS.Tobk_Logic tms_Tobk_Logic { get; set; }
        public object Any(ServiceModel.TMS.Tobk request)
        {
            CommonResponse ecr = new CommonResponse();
            ecr.initial();
            try
            {
                ServiceInterface.TMS.TableService ts = new ServiceInterface.TMS.TableService();
                ts.TS_Tobk(auth,request, tms_Tobk_Logic, ecr, this.Request.Headers.GetValues("Signature"), this.Request.RawUrl);             
            }
            catch (Exception ex) { cr(ecr, ex); }
            return ecr;
        }

        #endregion

        #region Common
        public object Post(Uploading request)
								{
												//string[] segments = base.Request.QueryString.GetValues(0);
												//string strFileName = segments[0];
												//string strPath = HttpContext.Current.Request.PhysicalApplicationPath;
												//string resultFile = Path.Combine(@"C:\inetpub\wwwroot\WebAPI\attach", strFileName);
												//if (File.Exists(resultFile))
												//{
												//				File.Delete(resultFile);
												//}
												//using (FileStream file = File.Create(resultFile))
												//{
												//				byte[] buffer = new byte[request.RequestStream.Length];
												//				request.RequestStream.Read(buffer, 0, buffer.Length);
												//				file.Write(buffer, 0, buffer.Length);
												//				file.Flush();
												//				file.Close();
												//}
												return new HttpResult(System.Net.HttpStatusCode.OK);
								}
								#endregion
								private CommonResponse cr(CommonResponse ecr, Exception ex)
        {
            ecr.meta.code = 599;
            ecr.meta.message = "The server handle exceptions, the operation fails.";
            ecr.meta.errors.code = ex.GetHashCode();
            ecr.meta.errors.field = ex.HelpLink;
            ecr.meta.errors.message = ex.Message.ToString();
            return ecr;
        }
    }
}
