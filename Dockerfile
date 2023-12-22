 # 1. For build React app
FROM node:alpine AS builder

WORKDIR /fronend-manage

COPY package.json /fronend-manage/package.json
COPY package-lock.json /fronend-manage/package-lock.json

RUN yarn install
COPY . /fronend-manage

EXPOSE 4001

CMD [ "yarn", "start" ]
