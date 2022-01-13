FROM  node:16.13.1

WORKDIR  /app

COPY package.json /app/package.json

RUN  yarn

COPY . /app

RUN yarn build

EXPOSE 9200

CMD  ["yarn", "start:prod" ]
