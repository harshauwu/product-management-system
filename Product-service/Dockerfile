FROM node:lts-alpine3.19

#create a working directory
WORKDIR /usr/src/app/product-service

#copy package.json file under the working directory
COPY package.json /usr/src/app/product-service

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app/product-service

#expose the port 4003
EXPOSE 4003

#start nodejs server
CMD npm run start-watch
