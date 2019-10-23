FROM securetrading1/js-payments-image:master
COPY . /app/js-payments-card
WORKDIR /app/js-payments-card
RUN npm rebuild node-sass
# RUN git pull --ff-only
RUN npm config set js-payments-card:host merchant.example.com
RUN npm install -g npm && npm install && npm run build:automated
EXPOSE 8080
ENTRYPOINT ["npm", "start:automated"]
