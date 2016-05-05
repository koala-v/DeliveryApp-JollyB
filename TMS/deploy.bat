@echo on

xcopy /y/e/s www \\192.168.0.230\wwwroot\mobileapp-d\www
copy /y index.html \\192.168.0.230\wwwroot\mobileapp-d\
copy /y update.json \\192.168.0.230\wwwroot\mobileapp-d\
copy /y TMS.apk \\192.168.0.230\wwwroot\mobileapp-d\TMS.apk
del TMS.apk /f /q

pause 