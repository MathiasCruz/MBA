FROM node:latest

WORKDIR /USR/src/app

COPY package.json ./

RUN npm install

COPY ./src/ ./src

EXPOSE 5678

CMD ["npm","start"]