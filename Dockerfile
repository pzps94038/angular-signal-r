FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm run build
COPY . .
CMD ["npm", "run", "start:prod"]
