# Use the official Node.js image with Alpine Linux
FROM node:lts-alpine3.19

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start the Node.js application
CMD ["node", "src/app.js"]