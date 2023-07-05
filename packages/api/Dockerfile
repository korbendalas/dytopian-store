FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm install rimraf --save-dev
RUN npm run build

EXPOSE 4000

CMD npm run start:dev