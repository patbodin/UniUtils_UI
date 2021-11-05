# pull official base image
FROM node:16-alpine3.14

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./
RUN npm install --quiet
RUN npm install react-scripts -g --quiet

# add app
COPY . ./

# start app
CMD ["npm", "start"]
