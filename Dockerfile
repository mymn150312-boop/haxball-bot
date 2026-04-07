FROM ghcr.io/puppeteer/puppeteer:21.0.0

USER root
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

CMD ["node", "index.js"]
