#!/bin/bash
. common_script.sh
cat common_script.sh > vpl_execution

echo "#!/bin/bash">> bashscript

#export PATH="/usr/local/bin:$PATH"
echo "cp -r /usr/local/customlibs/test ." >> bashscript
echo "cp app.spec.ts test/tests/app.spec.ts" >> bashscript
#echo "ls" >> bashscript

url=$(grep -oP '(?<=value=")[^"]*(?=")' url.xml)
echo "url=$url" >> bashscript
echo "cd test" >> bashscript
echo "$url"
echo "PLAYWRIGHT_BROWSERS_PATH=/usr/local/customlibs/.cache/ms-playwright BASE_URL=$url npx playwright test tests/app.spec.ts > output.txt" >> bashscript
echo "cp output.txt ../" >> bashscript
#echo "cat output.txt" >> bashscript
bash bashscript

cat >>vpl_execution << 'EOF'




# Extract the total number of tests run from output.txt
totaltests=$(grep -oP '(?<=Running )[0-9]+' output.txt)
#echo $totaltests
#echo "_____________"
# Extract the number of passed tests from output.txt
testcasespassed=$(grep -oP '^\s*[0-9]+(?=\spassed)' output.txt)
#echo $testcasespassed

# Calculate the grade value based on the number of tests run and passed
if [ -n "$totaltests" ] && [ -n "$testcasespassed" ]; then
    gradevalue=$((100 * testcasespassed / totaltests))
else
    echo "Error: Unable to extract integer values for totaltests or testcasespassed."
    exit 1
fi

# Output all lines except the last 5 lines of output.txt
tail -n -3 output.txt

# Check the grade value and set the appropriate grade
if [ "$gradevalue" -eq 100 ]; then
    echo "Congratulations"
    grade=$gradevalue
else
    echo "----"
    grade=$gradevalue
fi

# Output the grade
echo "Grade :=>>$grade"


EOF
chmod +x vpl_execution