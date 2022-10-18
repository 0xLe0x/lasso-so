FROM node:16

WORKDIR /home/app

ADD . /home/app

# Cypress dependencies
RUN apt-get update; apt-get upgrade -y
RUN apt-get install -y \
    libgtk2.0-0 libgtk-3-0 libgbm-dev \
    libnotify-dev libgconf-2-4 libnss3 libxss1 \
    libasound2 libxtst6 xauth xvfb  

RUN npm install

EXPOSE 8080

