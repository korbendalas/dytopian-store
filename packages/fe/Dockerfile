# Use an official Node.js image as the base image
FROM node:18.19.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the frontend app
RUN yarn build

# Use a lightweight Nginx image as the final image
FROM nginx:alpine

# Copy the built static files from the builder stage to the nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
