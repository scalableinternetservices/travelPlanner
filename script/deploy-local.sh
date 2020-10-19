#!/bin/bash

##########################################################################
# deploy-local.sh
#
# Usage:
#   ./script/deploy-local.sh [version]
#
##########################################################################

set -e

echo "Packaging and deploying local repo contents."
echo "================================="

aws ecr get-login-password | docker login --username AWS --password-stdin 101624687637.dkr.ecr.us-west-2.amazonaws.com

echo "Building local docker image"
docker build --tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:local .

echo "Pushing local docker image"
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:local

echo "Updating previous and latest"
docker pull 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:latest
docker tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:latest 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:previous
docker tag 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:local 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:latest

echo "Pushing latest and previous"
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:latest
docker push 101624687637.dkr.ecr.us-west-2.amazonaws.com/travelPlanner:previous

echo "Updating app-web"
./script/deploy-ecs.sh travelPlanner-app-web "local"

# echo "Updating app-background"
# ./script/deploy-ecs.sh app-background "local"

# echo "Updating lambda"
# aws lambda update-function-code \
#   --no-cli-pager \
#   --region us-west-2 \
#   --function-name travelPlanner \
#   --zip-file fileb://./server/bundle.zip

echo "DONE"
