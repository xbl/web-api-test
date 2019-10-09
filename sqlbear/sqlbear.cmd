
@Echo off

setlocal

@REM Set the current directory to the installation directory
call :getCurrentBatch INSTALLDIR1
set INSTALLDIR=%INSTALLDIR1%
set INSTALLDIR=%INSTALLDIR:~0,-10%

if exist "%INSTALLDIR%\jre\bin\java.exe" (
 set JAVA_CMD="%INSTALLDIR%\jre\bin\java.exe"
) else (
 @REM Use JAVA_HOME if it is set
 if "%JAVA_HOME%"=="" (
  set JAVA_CMD=java
 ) else (
  set JAVA_CMD="%JAVA_HOME%\bin\java.exe"
 )
)

if "%JAVA_ARGS%"=="" (
  set JAVA_ARGS=
)

@REM Determine Flyway edition to use
:loop
IF NOT [%1]==[] (
    IF [%1]==[-community] (
        SET FLYWAY_EDITION=community
        GOTO :loop-end
    )
    IF [%1]==[-pro] (
        SET FLYWAY_EDITION=pro
        GOTO :loop-end
    )
    IF [%1]==[-enterprise] (
        SET FLYWAY_EDITION=enterprise
        GOTO :loop-end
    )
    SHIFT /1
    GOTO :loop
)
:loop-end
if "%FLYWAY_EDITION%"=="" (
  set FLYWAY_EDITION=community
)

%JAVA_CMD% %JAVA_ARGS% -cp "%CLASSPATH%;%INSTALLDIR%\jars\*;%INSTALLDIR%\lib\%FLYWAY_EDITION%\*;%INSTALLDIR%\drivers\*" com.xbl.sqlbear.Command %*

@REM Exit using the same code returned from Java
EXIT /B %ERRORLEVEL%

:getCurrentBatch
    set "%~1=%~f0"
    goto :eof