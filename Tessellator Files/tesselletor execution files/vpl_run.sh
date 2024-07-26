#!/bin/bash
. common_script.sh
cat common_script.sh > vpl_execution
cp -r /usr/local/customlibs/test .
cp app.spec.ts test/tests/app.spec.ts
#cp playwright.config.js test/playwright.config.js
url=$(grep -oP '(?<=value=")[^"]*(?=")' url.xml)
# Check if the URL was successfully extracted
if [ -z "$url" ]; then
    echo "Failed to extract URL from url.xml"
    exit 1
fi
# Print the extracted URL
echo "Extracted URL: $url"
echo "cd test && PLAYWRIGHT_BROWSERS_PATH=/usr/local/customlibs/.cache/ms-playwright BASE_URL=$url npx playwright test tests/app.spec.ts" > vpl_execution
chmod +x vpl_execution
