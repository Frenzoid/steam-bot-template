FROM  node:8
   
ENV VARIABLE=ItWorks

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon
RUN npm install -g pg

COPY package.json /usr/src/app/

RUN npm install
RUN apt-get update
RUN apt-get install nano

COPY ./dist /usr/src/app/dist

CMD [ "npm", "run", "serve" ]