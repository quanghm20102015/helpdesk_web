FROM node:12.2.0 as build

# set working directory
WORKDIR /usr/src/app
# install and cache app dependencies
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

# SET ENVIRONMENT VARIABLES
# ENV HOSTING: 'http://14.177.66.105:83'
# ENV HOSTING_AUTH: 'http://14.177.66.105:83/auth'
# ENV HOSTING_BHTN: 'http://14.177.236.88:8083'
# ENV HOSTING_TVGTVL: 'http://14.177.66.105:83/tvgtvl'
# ENV HOSTING_ROOT: 'http://14.177.66.105:83/root'
# ENV HOSTING_PGD: 'http://14.177.66.105:83/pgdvl'
# ENV HOSTING_HIST: 'http://14.177.66.105:83/history'
# ENV HOSTING_ASSIGN: 'http://14.177.66.105:83/cddh'
# ENV HOSTING_XHTD: 'http://14.177.66.105:8686'
# ENV HOSTING_TTS: 'http://14.177.66.105:8687'
# ENV HOSTING_VIEW_FILE: 'http://14.177.236.88:6062'

# EXPOSE 4200
# add app
COPY . /usr/src/app
# # # start app
# USER node
# CMD ["npm", "start"]
# RUN npm run build --prod
RUN npm run build-prod

### STAGE 2: Run ###
FROM nginx:latest
#copying compiled code from dist to nginx folder for serving
COPY --from=build /usr/src/app/wwwroot/ /usr/share/nginx/html

#copying nginx config from local to image
COPY /nginx.conf /etc/nginx/conf.d/default.conf
#exposing internal port
EXPOSE 80