@echo off
title SafarZap - North India Tours & Travel Server
cd /d "%~dp0"
echo ========================================================
echo   Starting SafarZap Travel Server...
echo   Brand: SafarZap
echo   Helpline: +91 8725969152
echo   Email: safarzap@gmail.com
echo ========================================================
start "" "http://localhost:5000"
"C:\Program Files\nodejs\node.exe" server.js
pause
