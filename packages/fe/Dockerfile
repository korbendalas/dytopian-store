FROM node:18-alpine AS builder

WORKDIR /app

COPY ../yarn.lock .

COPY packages/fe/package.json .
RUN yarn install --frozen-lockfile

COPY packages/fe ./

RUN yarn build

FROM nginx:stable-alpine AS prod

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]