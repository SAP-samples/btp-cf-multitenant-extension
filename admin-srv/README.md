# Admin Service
This Service is responsible for managing the company specific data and customization. Organizations need to have their own name and logo as part of applications they are subscribing to. This service is used to manage the data for same. Here's the list of funcationalities this service offers: 
1. Managing the company logo. 
2. Setting the title of company.
3. Creating the mentor masterdata.


# Handling Multitenancy
In this microservice and others we use service manager to fetch tenant specific HDI container credentials based of the tenant ID. Once we get the credentials we connect to the tenant specific hana containers. The connection setting can be found here in this [file](./utility/service-manager.js)

# Storing the configurations
Admin Configuration is stored in the database. The database is configured in this [file](../db//src/data/Configuration.hdbtable)

We use `HANA` Blob datatype to store the logo. Ideally we should be using some document store like [`Document Service`](https://help.sap.com/docs/DOCUMENT_MANAGEMENT) or [`Object store`](https://help.sap.com/docs/ObjectStore) to store the logo. Since we just need 1 image for this application we are storing the logo in the HANA database.
