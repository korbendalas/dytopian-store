FROM node:18-alpine AS builder

WORKDIR /api

COPY ../yarn.lock .

COPY packages/api/package.json .
RUN yarn install --frozen-lockfile

COPY packages/api ./

RUN yarn build

FROM node:18-alpine AS prod

WORKDIR /api

COPY --from=builder /api/dist ./

ENV PM2_HOME=/usr/local/pm2
ENV PATH=$PATH:$PM2_HOME/bin

RUN npm install pm2@latest -g

CMD ["pm2", "start", "pm2.config.js"]