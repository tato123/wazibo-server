# Overview

The Wazibo server project handles storage, data manipulation, and basic user management services (i.e. user authentication).

# Installation

To get started run the command

``` 
npm install 
```

# Running

This application runs can be run as a docker container or locally. While its preferable to run with docker for consistency, 
developers can still choose to run the application manually.

## Running locally

This application requires a mongodb datasource as the datastore. To run developers will need to run through the following steps:

1. Install mongodb (version 3.0+) 
2. Run mongodb 
	```
	mongod --dbpath <<directory>>/db
	```
3. npm start

## Running with Docker

Run mongodb image
```
docker run --name wazibo-mongodb -d mongo
```
Build current server docker image
```
docker build -t wazibo/server .
```

```
docker run -p 9080:9080 --name wazibo-server --link wazibo-mongodb:mongo -d wazibo/server
```

If you are running on OSX you will need to also use the IP / host of the virtual box instance (this cannot be mapped back to localhost).
To get the assigned IP or host use the command

```
docker-machine env default
```

The ip address will be visible under the field "DOCKER_HOST"

## Publishing to Google Cloud production servers

Wazibo server currently uses google cloud engine, to deploy you must install the following

	- docker
	- gcloud (google cloud management shell)
	- kubectl (kubernetes management, installed via gcloud shell)

More details on how to get started and in general how google container engine works are available here 
https://cloud.google.com/container-engine/docs/tutorials/hello-node
	
To build the docker container and deploy to Google cloud (assuming you are logged in using gcloud init) you can run the following command

```
npm run gcloud-deploy
```

This will automatically take care of building a new version and deploying to Google container engine


# Architecture

This section contains the HLD of how the current version is implemented (each version branch should contain an updated README based on current 
project implmeentation).

## REST API

### Authentication

Users can authenticate through facebook by using the following API methods



## Data Storage model

```
{
	_id: <ObjectId>	
	oppurtunity : {
		user: <string>
		name: <string>
		description: <string>
		location: <string>
		date: <date>
		tc: <string>
		user_tc: <string>
		items: [
			{
				user: <string>
				name: <string>
				price: <number>
				photo: [
					{
						url: <url>	
					}	
				]
				description: <string>
				qr: <url>
			}	
		]
	}	
}
```