# Our base image
FROM node:alpine

# Where the application will live in the container
WORKDIR /app

# Copy everything from the source directory into the image
COPY . .

# Use the image's npm to install node_modules for the backend
RUN npm install

# NOTE: the frontend's static build is pre-built and committed, so it does not need to be built here
# This is not recommended for real applications, but serves to simplify the tutorial

# We will be serving web content on the container's port 80
EXPOSE 80

# The command to start the application
CMD ["node", "index.js"]
