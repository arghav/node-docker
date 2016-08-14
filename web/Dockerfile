FROM node:6-wheezy

# Create app directory
RUN mkdir -p /node-web
WORKDIR /node-web

# Install app dependencies
COPY package.json /node-web
RUN npm install
