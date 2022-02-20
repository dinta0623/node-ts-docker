FROM node:14.5.0-alpine
# RUN npm install -g nodemon
#create app directory
WORKDIR /dist/server
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
# where available (npm@5+)
RUN npm install
# Bundle app source
COPY .  .
#remider for using 8080
EXPOSE 8080
#add command 
CMD [ "npm", "start" ]
#to build this image : docker build . -t <image-name>
#to run this image : docke run -it -p port:port <image-name>
#docker push <image name>