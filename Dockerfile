FROM node

ENV TOKEN_VAL="string"

WORKDIR /bot

COPY package*.json ./

RUN npm i

COPY . .
 CMD [ "node", ".", "--trace-warnings" ]
