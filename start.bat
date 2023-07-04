@echo off
echo starting built app
call node ./server/dist/server/src/index.js
call chrome http://localhost:3001
