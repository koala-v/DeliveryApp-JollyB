using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.ServiceModel;
using WebApi.ServiceModel.TMS;

namespace WebApi.ServiceInterface.TMS
{
    public class TableService
    {
        public void TS_Tobk(Auth auth, Tobk request, Tobk_Logic tobk_Logic, CommonResponse ecr, string[] token, string uri)
        {
            if (auth.AuthResult(token, uri))
            {
                if (uri.IndexOf("/tms/tobk1") > 0)
                {
                    ecr.data.results = tobk_Logic.Get_Tobk1_List(request);
                }
                else if (uri.IndexOf("/tms/tobk1/sps") > 0)
                {
                    ecr.data.results = tobk_Logic.Get_Tobk1_SpsList(request);
                }
                ecr.meta.code = 200;
                ecr.meta.message = "OK";
            }
            else
            {
                ecr.meta.code = 401;
                ecr.meta.message = "Unauthorized";
            }
        }

    }
}
