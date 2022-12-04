FROM node:16.14.0
WORKDIR /server
RUN npm -g install npm
COPY package*.json ./
RUN npm install

ENV NODE_ENV=production
COPY . .
CMD echo "nocommand"
