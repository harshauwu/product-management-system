#!/bin/bash

# Define variables
IMAGE_NAME="analytics-s"
CONTAINER_NAME="analytics_service"
NETWORK="mynet"
ENV_FILE=".env"
VOLUME_PATH="$PWD:/usr/src/app:cached"
WORKDIR="/usr/src/app"

# Build the Docker image
docker build -t $IMAGE_NAME --file Dockerfile .

# Stop and remove the existing container if it exists
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Run the Docker container
docker run --rm -it --net $NETWORK --env-file $ENV_FILE --name $CONTAINER_NAME -v $VOLUME_PATH -w $WORKDIR $IMAGE_NAME sh