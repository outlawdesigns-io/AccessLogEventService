FROM node:carbon
WORKDIR /usr/src/app/
ENV TZ=America/Chicago
ARG DOCKER_ENV
ENV NODE_ENV=${DOCKER_ENV}
RUN mkdir -p /mnt/LOE/log
COPY . .
RUN npm install
CMD ["/bin/sh","-c","npm start > /mnt/LOE/log/AccessLogEvents.log"]
