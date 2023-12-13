# Use a Node.js base image with a specified version
FROM node:18.19.0-alpine

# Install Yarn globally
RUN npm install -g yarn

# Create and set the working directory
WORKDIR /api

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN yarn build

# Install PM2 globally
RUN yarn global add pm2

# Expose the port that your NestJS app is running on
EXPOSE 4000

# Command to run the application using PM2
CMD ["pm2-runtime", "start", "dist/main.js", "--name", "nestjs-app", "--watch"]
