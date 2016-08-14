FROM node:6-wheezy

# Create app directory
RUN mkdir -p /node-api
WORKDIR /node-api

# Install app dependencies
COPY package.json /node-api
RUN npm install
