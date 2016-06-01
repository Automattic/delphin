#!/bin/bash
git checkout master
git pull
git checkout production
git rebase master
npm run static
git add .
git commit -am "Building static files"
git push
