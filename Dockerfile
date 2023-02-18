FROM node:18.12.1 as builder

WORKDIR /app/admin

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN rm -rf node_modules

RUN apt-get update

RUN yarn

RUN yarn build

FROM nginx

EXPOSE 80 

COPY --from=builder /app/admin/public /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]