FROM node:19.6

WORKDIR /app
COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build
RUN mv ./build/ ../server/www
RUN mv ./privacy_policy/ ../server/www/privacy_policy

WORKDIR /app/server
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]