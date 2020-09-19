#!/usr/bin/env bash
echo "Stage all files"
git add .

echo "Please add commit message"
read message
git commit -m "${message}"

echo "Push to develop branch"
git push -u origin develop