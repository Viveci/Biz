# Use Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install &&  npm install sqlite3 --save

# Copy the rest of the application
COPY . .

# Expose the port the backend listens on
EXPOSE 3000

# Command to run the backend
CMD ["npm", "run", "dev"]

