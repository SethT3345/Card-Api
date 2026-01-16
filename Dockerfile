FROM node:latest

WORKDIR /app

LABEL maintainer="Seth T <sjt2908@gmail.com>"
LABEL description="trying out docker"
LABEL cohort="21"
LABEL animal="dog"

EXPOSE 8080

COPY . .

RUN npm install

CMD ["node", "Server.js"]