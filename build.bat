@echo off

echo starting serverr build
cd server
call yarn build
cd ..
echo server build done

echo starting client build
cd client
call yarn build
cd ..
echo client build done

robocopy client/build server/dist/client /E