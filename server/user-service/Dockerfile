FROM node:latest

RUN addgroup --system pm && adduser --system --group pm

ENV HOME=/home/pm

COPY package.json $HOME/app/

COPY . $HOME/app

WORKDIR $HOME/app

RUN npm install --silent --progress=false --production

RUN chown -R pm:pm $HOME/*

USER pm

EXPOSE 8500

CMD ["npm", "start"]