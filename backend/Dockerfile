FROM node:18

# Install Netcat (OpenBSD version)
RUN apt-get update && apt-get install -y netcat-openbsd

# set a working directory inside the container to make it easier to run the next commands inside that directory
WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3001

# CMD ["nodemon", "--legacy-watch", "src/index.js"]