# Use Node.js base image to build the React app
FROM node:16-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve the built frontend
FROM nginx:alpine

# Copy built files to Nginx server directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

