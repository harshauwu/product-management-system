#/bin/bash

docker stop product_service && docker rm product_service 
docker build -t product-s --file Dockerfile .
docker run --rm -v $PWD:/usr/src/app/product-service:cached --name product_service -p 4003:4003 --env-file .env --network mynet -d product-s
docker logs -f product_service
