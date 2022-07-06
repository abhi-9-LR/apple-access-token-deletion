# Apple Access token deletion 
This repository provides details on how to invalidate the apple access token based LoginRadius AccountDeletion webhook
## Installation
Run this command to install the required dependency.
``` bash
npm install 
```
Create a `.env` file in root directory and add following constant
 1. Create an environment variable `client_id` and add the apple client_id, which will be used in apple revoke token API call.
 2. Create an environment variable `client_secret` and add the apple client_secret, which will be used in apple revoke token API call.
 For insights on how to create apple client_secret, please see https://github.com/LoginRadius/apple-client-secret-generator
Run this command to start the server
```bash
npm start
```
## Api
 [apple access token deletion endpoint API](#apple-access-token-deletion-endpoint-API)<br>
>To run the above API using PostMan you can download using this [link](https://drive.google.com/file/d/1fE7o4XgAB0Rm8vWLq_D_N07vSxTUXZsm/view?usp=sharing) and Import in Postman 
 ### apple access token deletion endpoint API.
 <br>
 This Api revokes the apple access token received from the user profile
 #### Api Endpoint
 `http://localhost:3000/api/webhook`
 #### Headers
In order to use this endpoint, you need to pass `client_id` and 'client_secret' that we have created previously under .env file in the header

Sample respone: 

#### Output
```json
{
    "description": "",
    "statusCode": 200
}

Note: Apple only returns success code as 200 and does not return any success message/description
```
