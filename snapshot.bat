@echo off
cls

set "outputFile=ProjectBriefing.txt"
echo Generating report file: %outputFile%

:: Redirect output of all commands to the specified file
(
    echo --- Project Structure ---
    echo.
    tree /f
    echo.

    echo --- package.json ---
    echo.
    type package.json
    echo.

    echo --- next.config.js or .mjs ---
    echo.
    (type next.config.js || type next.config.mjs) 2>nul || echo No next.config file found.
    echo.

    echo --- tsconfig.json ---
    echo.
    type tsconfig.json
    echo.

    echo --- tailwind.config.js or .ts ---
    echo.
    (type tailwind.config.js || type tailwind.config.ts) 2>nul || echo No tailwind.config file found.
    echo.

    echo --- End of Report ---
) > "%outputFile%"

echo.
echo Report generation complete!
echo.
PAUSE