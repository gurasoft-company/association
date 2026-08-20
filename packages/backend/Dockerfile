FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install && npm rebuild sqlite3 --build-from-source && npm cache clean --force

COPY . .

RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]