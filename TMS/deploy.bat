@echo on
set target="\\192.168.0.230\wwwroot\app\tms\jollyb"
xcopy /y/e/s www %target%\www
pause 
copy /y index.html %target%
copy /y update.json %target%
copy /y TMS-JollyB.apk %target%\TMS-JollyB.apk
del TMS-JollyB.apk /f /q
pause 