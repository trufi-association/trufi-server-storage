FROM node:18.12

WORKDIR /app
COPY . .

WORKDIR /app
RUN npm install

EXPOSE 4000

ENTRYPOINT [ "npm", "start" ]