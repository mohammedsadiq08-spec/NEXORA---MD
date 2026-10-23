@echo off
title NEXORA Frontend Dashboard
cd /d "%~dp0frontend"
echo ===================================================
echo   NEXORA — Next-Generation Student Analytics System
echo   Starting Frontend Web Application...
echo   URL: http://localhost:3000/
echo ===================================================
npm run dev
pause
