@echo off
title FRUIT SLICE RUSH
cls
cd /d "%~dp0"

echo ========================================================
echo              🍉 FRUIT SLICE RUSH ⚔️
echo ========================================================
echo.
echo Launching game at: http://localhost:5174/
echo.

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:5174/"
) else (
    start "" "http://localhost:5174/"
)

exit
