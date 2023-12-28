FROM node:18-alpine AS builder

WORKDIR /api
COPY .env .env

COPY ../yarn.lock .

COPY packages/api/package.json .
RUN yarn install --frozen-lockfile

COPY packages/api ./

RUN yarn build

FROM node:18-alpine AS prod

WORKDIR /

COPY --from=builder /api/dist ./api/dist
COPY --from=builder /api/package.json ./api/
COPY --from=builder /api/yarn.lock ./api/
COPY --from=builder /api/prisma/schema.prisma ./api/
COPY --from=builder /api/.env ./api/

ENV PM2_HOME=/usr/local/pm2
ENV PATH=$PATH:$PM2_HOME/bin

RUN npm install pm2@latest -g

# Specify the command to start your application with PM2
CMD ["sh", "-c", "cd /api && yarn install --frozen-lockfile && yarn run prisma:db:push && yarn run prisma:db:seed && pm2 start /api/dist/src/main.js --no-daemon"]
