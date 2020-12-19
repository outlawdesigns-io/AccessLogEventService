FROM node:carbon
WORKDIR /usr/src/app/
ENV TZ=America/Chicago
RUN mkdir -p /mnt/LOE/log
COPY . .
RUN npm install
CMD ["/bin/sh","-c","npm start > /mnt/LOE/log/AccessLogEvents.log"]
