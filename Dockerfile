FROM node

ENV TOKEN_VAL="string"

WORKDIR /bot

COPY package*.json ./

COPY . .
 CMD [ "node", ".", "--trace-warnings" ]
