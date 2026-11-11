@echo off
title FRUIT SLICE RUSH - Google Chrome
cls

echo ========================================================
echo              🍉 FRUIT SLICE RUSH ⚔️
echo ========================================================
echo.
echo Launching in Google Chrome: http://localhost:5174/
echo.

if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" "http://localhost:5174/"
) else (
    start "" "http://localhost:5174/"
)

exit
