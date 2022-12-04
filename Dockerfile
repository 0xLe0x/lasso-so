FROM node:16

WORKDIR /home/app

ADD . /home/app

RUN yarn install
RUN yarn build

EXPOSE 8080

