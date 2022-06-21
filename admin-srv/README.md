# Understand the Admin Service

The Admin service is responsible for managing the company-specific data and customization. Organizations need to have their own name and logo in the applications they are subscribed to. This service is used to manage this kind of data. Here's the list of funcationalities this service offers: 
* Managing the company logo. 
* Setting the title of company.
* Creating the mentor masterdata.

The Admin service is a microservice that uses the SAP Service Manager to fetch tenant-specific SAP HANA Deployment Infrastructure (HDI) container credentials based on the tenant ID. Once we get the credentials we connect to the tenant specific hana containers. The connection setting can be found here in this [file](./utility/service-manager.js)

The configuration of the Admin service is stored in a database. The database is configured in this [file](../db//src/data/Configuration.hdbtable).

We use `HANA` Blob datatype to store the logo. Ideally, we should be using some document store like the [SAP Document Management Service](https://help.sap.com/docs/DOCUMENT_MANAGEMENT) or the [Object store on SAP BTP](https://help.sap.com/docs/ObjectStore) to store the logo. Since we just need one image for this application, we are storing the logo in the SAP HANA database.
