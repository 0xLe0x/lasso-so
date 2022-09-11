FROM node:16

WORKDIR /home/app

COPY package*.json ./
COPY .env* ./

RUN npm install

EXPOSE 8080

