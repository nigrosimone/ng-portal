@echo off
npm version patch && ^
cd "%cd%\projects\ng-portal" && ^
npm version patch && ^
cd "%cd%" && ^
npm run build ng-portal --prod && ^
copy /y "%cd%\README.md" "%cd%\dist\ng-portal\README.md" && ^
copy /y "%cd%\LICENSE" "%cd%\dist\ng-portal\LICENSE" && ^
cd "%cd%\dist\ng-portal" && ^
npm publish --ignore-scripts && ^
cd "%cd%"
pause