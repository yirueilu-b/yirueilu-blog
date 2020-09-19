#!/usr/bin/env bash
echo "Stage all files"
git add .

echo "Please add commit message"
read message

while true
do
    echo "Are you sure to commit with ${message} message? ( y/n )"
    read confirm
    if [[ "${confirm}" == "y" ]]; then
        git commit -m "${message}"
        echo "Push to develop branch"
        git push -u origin develop
        break
    elif [[ "${confirm}" == "n" ]]; then
        echo "Not commit and push"
        break
    else
        echo "Please enter 'y' or 'n'"
    fi
done
