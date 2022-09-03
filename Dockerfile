FROM node:16

WORKDIR /home/app

COPY package*.json ./

RUN npm install

EXPOSE 8080

