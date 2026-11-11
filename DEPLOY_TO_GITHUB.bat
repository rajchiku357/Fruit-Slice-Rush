@echo off
title Deploy Fruit Slice Rush to GitHub
cls
echo ========================================================
echo        DEPLOYING FRUIT SLICE RUSH TO GITHUB
echo ========================================================
echo.
echo 1. Pushing code to https://github.com/rajchiku357/Fruit-Slice-Rush...
git push -u origin main
echo.
echo 2. Building production bundle and deploying to GitHub Pages...
npm run deploy
echo.
echo ========================================================
echo DEPLOYMENT COMPLETE!
echo.
echo Check your live game at:
echo https://rajchiku357.github.io/Fruit-Slice-Rush/
echo ========================================================
echo.
pause
