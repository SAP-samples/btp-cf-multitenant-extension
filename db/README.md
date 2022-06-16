# Database Service
The database microservice is responsible for creating database tables for each of the newly onboarded subscribers.
This project uses the package [`@sap/hdi-dynamic-deploy`](https://www.npmjs.com/package/@sap/hdi-dynamic-deploy) to deploy the database articats to the HDI container. 

## How it works
The datbase module is deployed as a microservice. It seems HDI container credentials as a payload and based on the credentials it establishes a connection to the database, deploys the database artifacts and creates the tables. 

## Database tables used
This database module creates the following tables:
- Mentor
- Franchise
- Comfiguration

### Mentor
The mentor table is used to store the details of the mentors.
The following fields are part of this table:
- MENTORID
- NAME
- EMAIL
- PHONE
- EXPERIENCE
- PRIMARY KEY

### Franchise
The franchise table is used to store the details of the franchises.
The following fields are part of this table:
- BUSINESSPARTNERID
- BUSINESSPARTNERNAME
- UPDATED_BY 
- UPDATED_ON
- MENTORID

### Configuration
The configuration table is used to store customization details of the application. This gives unique identifier to each of the subscribing tenants. 
The fields are:
- ID
- TITLE
- FILE_NAME
- FILE_DESC
- FILE_TYPE
- FILE_CONTENT

