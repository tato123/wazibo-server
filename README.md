# Overview

The Wazibo server project handles storage, data manipulation, and basic user management services (i.e. user authentication).

# Data Storage model

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