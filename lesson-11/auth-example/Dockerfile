FROM node:16

WORKDIR /app

COPY package*.json ./

RUN export $(cat .env.dev) && npm install 

COPY . .

EXPOSE $PORT

CMD export $(cat .env.dev) && npm start 