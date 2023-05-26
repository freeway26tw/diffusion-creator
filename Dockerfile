# FROM ghcr.io/puppeteer/puppeteer:20.2.0

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm ci
# COPY . .
# CMD [ "node", "app.js" ]

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOST 3000

CMD [ "npm", "start" ]