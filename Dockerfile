FROM ghcr.io/puppeteer/puppeteer:20.2.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

# Install Prisma globally
RUN npm install -g prisma

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "app.js" ]