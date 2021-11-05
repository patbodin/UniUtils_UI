# pull official base image
FROM node:16-alpine3.14

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --quiet
#RUN npm install react-scripts -g --quiet
RUN npm config set registry https://lib.matador.ais.co.th/repository/npm/ \
    && npm set puppeteer_download_host=https://lib.matador.ais.co.th/repository/raw \
    && npm install --quiet --production


# add app
COPY . ./

RUN chmod -R 775 /usr/src/app

# start app
CMD ["npm", "start"]
