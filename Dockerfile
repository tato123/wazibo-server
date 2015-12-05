FROM node:0.10.40

MAINTAINER Jonathan Fontanez<jonathan.fontanez@vce.com>

# Bundle application source
COPY . /wazibo-server/src
# Install dependencies
RUN cd /wazibo-server/src; npm install -production
# Expose our port for mapping
EXPOSE  9080
# Run the application
CMD ["node", "/wazibo-server/src/index.js"]