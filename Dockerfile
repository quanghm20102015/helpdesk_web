FROM node:latest as build

WORKDIR /usr/src/app

COPY ./ /usr/src/app

RUN npm install

RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY  --from=build /app/nginx/*  /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/chat-mg /usr/share/nginx/html
EXPOSE 80

