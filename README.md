&nbsp;

# api-rest-payment-gateways-node proyect

This application is an example of how to develop a Back End Rest API using javascript (Node), with data persistence in MongoDB. Express has been used to deploy a server that listens to requests to handle payment gateways.

MongoDB has been used as a database due to its speed, flexibility and its powerful language when querying the database.

In this project you will be able to appreciate the use of:

- Good practices: Readable code, decoupled (easy to TDD), scalable, easily maintained, use of eslint as linter, use of middlewares.
- Design patterns:
    - MVC: Structured code in routes, controllers and models to make the application easily scalable and structured.
    - Singleton: Used to provide a logger to the application and recover the provider gateways.
    - Strategy: The strategy pattern is used for the appropriate provider gateway in a dynamic way, making the code much more readable, agile, and scalable if new ones are to be added. Also, it is used together with the singleton pattern.
- Middlewares: To manage errors, provide a logger, perform validations, handle responses, configurate app and use of own express middlewares.
- Inheritance: In order to be able to make the use of provider gateway more agile and consistent, inheritance is used to be able to declare new provider gateways following the same structure.

&nbsp;

## Performance
To deploy the application just follow the steps below.

### Versions used during development
- Npm: 6.14.15
- Node: v14.18.1
- MongoDB: 6.0.1
- mongodb lib npm: 4.9.1
- mongoose lib npm: 6.6.1

### Install

To install dependencies:

```
npm install
```

### Execute unit test

To run unit test and linter:

```
npm test
```

### Init server

To deploy the server:

```
npm run start
```

&nbsp;

## Endpoints exposed
The ip and port can be changed in .env file, like connections to mongo or logs level.

The api is divided into two resources. Pgateway to handle persistance and configuration of the previders allowed in the system and Payment, to implement the operation of each provider like: pay, reimburse or partial reimburse (leaving the door open to add more functionality in a simple and agile way).

- pgateway resource enpoints:
    - GET, POST http://127.0.0.1:4000/pgateway
    POST endpoint, accepts a body like:
        ```json
            {
            	"id": 100,
                "name": "Paypal provider",
            	"type": "paypal",
                "status": "active",
                "client_id": "someClientId", // Should be encrypted
                "client_secret": "someClientSecrets", // Should be encrypted
                "apiKey": "someApiKey" // Should be encrypted
            }
        ```
    - GET http://127.0.0.1:4000/pgateway/count (retur the total of pgateways stored in the system)
    - GET, PUT, DELETE http://127.0.0.1:4000/pgateway/:id
    PUT endpoint, accepts a body like:
        ```json
            {
                "name": "Paypal provider",
            	"type": "paypal",
                "status": "active",
                "client_id": "someClientId", // Should be encrypted
                "client_secret": "someClientSecrets", // Should be encrypted
                "apiKey": "someApiKey" // Should be encrypted
            }
        ```
    - PATCH http://127.0.0.1:4000/pgateway/:id/status/:state (Change status of provided pgateway. Allowed status values are: active, disabled, suspended and cancelled)
- Payment resource enpoints:
    - POST http://127.0.0.1:4000/payment/:id/pay
    POST endpoint, accepts a body like:
        ```json
            {
            	"orderId": "100000",
            	"amount": 180.5,
            	"currency": "USD"
            }
        ```
    - POST http://127.0.0.1:4000/payment/:id/reimburse
    POST endpoint, accepts a body like:
        ```json
            {
            	"orderId": "100000",
            	"amount": 180.5,
            	"currency": "USD"
            }
        ```
    - POST http://127.0.0.1:4000/payment/:id/partialReimburse
    POST endpoint, accepts a body like:
        ```json
            {
            	"orderId": "100000",
            	"amount": 180.5,
            	"currency": "USD"
            }
        ```

&nbsp;

## API Pagination
The pagination of the api allows the user to perform filters or projections on the endpoint Get all.
Along with the endpoint /count of each resource and the following parameters (sent as a query in the request), it will be possible to perform pagination:
- **limit** (Number): Limit of records to recover.
- **skip** (Number): Number of records to skip in the request response.
- **param** (Value): Setting a parameter of the record and his value, allows to filter by that. Ex: id: 10.
- **field** (String): Setting a string separated by ',' the API allows do a projection of this files. Ex: fields: id,title,publisher.id.
- **hideField** (String): Setting a string separated by ',' the API do a projection hidden the params indicated. Ex: hideFields: publisherId,_id,__v,publisher._id,publisher.__v.

The Get all endpoint, will returns an Object like the following:
```json
    {
        "data": [...], // Records objects
	    "limit": 0, // Limit of fields to recover indicated by the user
	    "skip": 0, // Field skiped indicated by the user
	    "total": 10 // Total of resources returned
    }
```
With this, and the resource explained before, the user can release a pagination in the API.

&nbsp;

## Suggestion to how to deploy this in a production environment
- [Using Docker or manully] Deploy this in a server as a service. You can use Jenkins as CI or do manually.
- [Using Docker or manully] Deploy this in AWS as a service using AWS services like EC2. You can use Jenkins as CI or do manually.
- [Using Docker or manully] Deploy this in AWS as a AWS Lambda. Also, you can deploy each endpoint as a AWS Lambda and use and AWS Api Gateway to route the request.
- [Using Docker or manully] Use before solutions using Azure.
- Use Third party service to deploy the proyect in a server as a service (like nssm).
