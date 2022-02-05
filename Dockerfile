FROM node:14.5.0-alpine

#create app directory
WORKDIR /dist/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY .  .
#open port
EXPOSE 8080
#add command 
CMD [ "npm", "start" ]

#to build this image : docker build . -t <image-name>
#to run this image : docker run -it -p port:port <image-name>