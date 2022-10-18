FROM node:16

WORKDIR /home/app

ADD . /home/app

RUN npm install

EXPOSE 8080

