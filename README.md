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


# Architecture


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