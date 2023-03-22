FROM node:18.12

WORKDIR /app
COPY . .

WORKDIR /app
RUN npm install
RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]