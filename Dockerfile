#FRONTEND
# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./front-end/package.json ./
COPY ./front-end/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY ./front-end ./

# start app
CMD ["npm", "start"]

#BACKEND
FROM node:latest

WORKDIR /back

ENV PATH /back/node_modules/.bin:$PATH

COPY ./back-end/package.json ./
COPY ./back-end/package-lock.json ./
RUN npm install --silent

COPY ./back-end ./

CMD ["npm", "start"]

#DATABASE