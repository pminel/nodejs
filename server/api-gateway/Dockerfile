FROM node:latest

RUN useradd --user-group --create-home --shell /bin/false pm && apt-get clean

ENV HOME=/home/pm

COPY package.json $HOME/app/

COPY . $HOME/app

WORKDIR $HOME/app

RUN npm install --silent --progress=false --production

RUN chown -R pm:pm $HOME/*

USER pm

EXPOSE 8443

CMD ["npm", "start"]