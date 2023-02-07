FROM node:18.12.1 as builder

WORKDIR /app/admin

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN rm -rf node_modules

RUN apt-get update

RUN yarn

RUN yarn build

FROM node:18-alpine

WORKDIR /app/admin

EXPOSE 7000

COPY --from=builder /app/admin/ /app/admin/

ENTRYPOINT ["yarn", "serve"]
