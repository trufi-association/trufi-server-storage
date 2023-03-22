FROM node:18.12

WORKDIR /app
COPY . .

WORKDIR /app/home
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]