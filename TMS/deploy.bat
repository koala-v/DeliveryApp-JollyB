@echo on

xcopy /y/e/s www \\192.168.0.230\wwwroot\mobileapp-JollyB\www
copy /y index.html \\192.168.0.230\wwwroot\mobileapp-JollyB\
copy /y update.json \\192.168.0.230\wwwroot\mobileapp-JollyB\
copy /y TMS.apk \\192.168.0.230\wwwroot\mobileapp-JollyB\TMS.apk
del TMS.apk /f /q

pause 