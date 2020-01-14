FROM securetrading1/js-payments-image:master as builder

COPY . /app/js-payments-card
WORKDIR /app/js-payments-card
RUN npm rebuild node-sass
# RUN git pull --ff-only
RUN npm config set js-payments-card:host merchant.example.com
RUN npm install -g npm
RUN npm install
RUN npm run build:automated

FROM nginx:1.16.1
COPY --from=builder ./app/js-payments-card/dist /usr/share/nginx/html
COPY docker/nginx/prod.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/key.pem /etc/ssl/st-cert/key.pem
COPY docker/nginx/cert.pem /etc/ssl/st-cert/cert.pem
