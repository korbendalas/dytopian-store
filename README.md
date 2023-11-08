# dytopian-store

## Description
We use Lerna Monorepo to manage our packages. This is the root package.
Navigate to the packages folder to see the packages we have. (API and FE),

## Installation
1. Clone the repo   
2. Run `yarn run bootstrap` to install all dependencies
3. Run `docker-compose up -d` to start the database
4. Run `yarn run prisma:db:push` to push the schema to the database
5. Run `yarn run prisma:db:seed` to seed the database
6. Run `yarn run start:dev` to start the API and FE