FROM node:18-alpine AS builder

WORKDIR /app

COPY ../yarn.lock .

COPY packages/fe/package.json .
RUN yarn install --frozen-lockfile

COPY packages/fe ./

# Install dotenv
RUN yarn add dotenv --dev

# Run dotenv to load environment variables
CMD ["yarn", "dotenv", "yarn", "build"]

FROM nginx:stable-alpine AS prod

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
