FROM node:23.6-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE 5173
ENTRYPOINT ["npm", "run", "dev"]