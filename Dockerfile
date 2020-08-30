FROM node:14.9

ENV TOKEN_VAL="string"

COPY . /bot

WORKDIR /bot

RUN npm i

