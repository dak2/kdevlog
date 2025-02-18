FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD ["npm", "run", "dev"]
