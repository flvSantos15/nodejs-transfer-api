FROM node:alpine

WORKDIR /usr/app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install

# Install nodemon globally for hot-reloading
RUN npm install -g nodemon

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3333

# Use nodemon for development
CMD ["nodemon", "--legacy-watch", "--watch", ".", "--ext", "ts,json", "--exec", "ts-node", "src/server.ts"]
