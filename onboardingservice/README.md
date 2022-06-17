# Understand the Onboarding Service

This services handles the following operations: 
- Creating tenants
- Deleting tenant
- Dependency callbacks
- Creating and updating the database schema and deploying the artifacts for the tenant

[SaaS provisioning service](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/8be9a3a51232402082480914e020b2d3.html) requires Tenant Registration callbacks to be implemented along with a dependency callback.
Additionally, a tenant schema must be created. In case of an update, the tables in the database should be updated for each of these tenants.

The Onboarding service has the following features:
- Tenant Registry callback 
- getDependencies callback 
- Creating HDI Container and deploying the database artifacts
- Creating the approuter 

## Tenant Registry Callback
The Tenant Registry callback is used to register the tenant with the [SaaS Provisioning service](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/8be9a3a51232402082480914e020b2d3.html). 
Once registered, the applications's URL is returned to the subscriber account. 
You can find the Tenant Registry callback logic in the [saasRoute.js#L20-L105](./routes/saasRoute.js#L20-L105) file

## getDependencies Callback
If the applicaiton uses service such as the Destination and the Connectivity services, the getDependencies callback is used to declare the those depdendencies in the SaaS provisioning service.
Any URL that the application exposes for GET dependencies. If the application does not have dependencies and the callback is not implemented, it should not be declared. 
**Note:** The JSON response of the callback must be encoded either with UTF8, UTF16, or UTF32. Otherwise, an error is returned. 
**Important:** You can either provide your own getDependencies callback or use the default implementation of the approuter (recommended if no special logic is needed). If you provide your own implementation, you have to make sure that the ABAP Solution instance is returned as a dependency.
The path is: `/callback/v1.0/dependencies`
You can find the code in the [dependencyRouter.js#L13-L31](./routes/dependencyRouter.js#L13-L31) file.

## Creating HDI Containers
For a multitenant application, secure segregation of data is critical. This applicaiton uses `HANA database` with `HDI container` based data isolation. 
Each tenant has its own [`HDI container`](https://help.sap.com/docs/SAP_HANA_PLATFORM/4505d0bdaf4948449b7f7379d24d0f0d/e28abca91a004683845805efc2bf967c.html?version=1.0.12&locale=en-us) which is created and deployed during the provisioning. In this application, the [`@sap/instance-manager`](https://www.npmjs.com/package/@sap/instance-manager) library is used to create and manage `HDI containers`. The instance manager package provides credentias caching which helps in quick access of HDI credentials when the tenants are trying to access data. 
The instance manager logic to `create` `HDI containers` is implemented in the [instanceManager.js#L18-L40](./utility/instanceManager.js#L18-L40) file.

## Deploying the Database Artifacts (Tables)
The database artifacts are deployed in the `HDI container` during the provisioning after the HDI container creation has been finished. 
The database artifacts are part of the [`Database Microservice`](../db). The Database service requires basic authentication along with the HDI container credentials in order to deploy tenant-specific artifacts. You can find the code in the [dbHandler.js](./utility/dbHandler.js) file. Here's the function which is used to deploy the database artifacts:

```javascript  
async (dbCredentials, tenantId, logger) => {
  try {
    Object.assign(dbCredentials, { id: tenantId });
    const options = {
      method: 'POST',
      data: dbCredentials,
      url: `${process.env.db_api_url}/v1/deploy/to/instance`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.db_api_user}:${process.env.db_api_password}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };
    const res = await axios(options);
    logger.info(`HDI Container created for Tenant ${tenantId}`);
    return res;
  } catch (err) {
    logger.error(err);
    return err;
  }
```

