# building
FROM node:lts-alpine3.19 as build-stage
WORKDIR /app

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# running
FROM nginxinc/nginx-unprivileged:alpine as production-stage

COPY --from=build-stage --chown=101:101 /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY startup.sh /usr/local/bin/startup.sh

CMD ["/usr/local/bin/startup.sh"]
