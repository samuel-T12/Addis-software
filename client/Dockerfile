FROM node:16

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
