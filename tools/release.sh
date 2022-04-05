#!/bin/bash

ACTION=$1

if [ -z "$ACTION" ]
then
      echo "You must specify action"
      exit 1
fi

if [ $ACTION != "patch" ] && [ $ACTION != "minor" ] && [ $ACTION != "major" ]; then
      echo "Action must be one of: patch, minor or major"
      exit 1
fi

# New tag/version
npm version $ACTION

# Push new version
git push

# Push new tags
git push --tags
