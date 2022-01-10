FROM  node:16.13.1

WORKDIR  /app

COPY package.json /app/package.json

RUN  yarn

COPY . /app

RUN rm ./node_modules/mongoose/index.d.ts

RUN yarn build


EXPOSE 8080

CMD  yarn start
