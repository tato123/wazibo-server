FROM node:0.12

MAINTAINER Jonathan Fontanez<fontanezj1@gmail.com>

# Commands will run in this directory
WORKDIR /wazibo-server/src

# Add all our code inside that directory that lives in the container
ADD . /wazibo-server/src
 
RUN npm install gulp jshint -g; npm install

# Expose our port for mapping
EXPOSE  9080
# Run the application
CMD ["npm", "run", "start"]