# Onboarding Service
This services handles the following operations: 
- Handle Teant Creation
- Handle Tenant Deletion
- Handle Dependency Callback
- Create, Update DB schema and deploy artifacts for the tenant

# Provisioning Service
[SaaS provisioning service](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/8be9a3a51232402082480914e020b2d3.html) requires Tenant Registration callbacks to be implemented along with dependency callback.
Additional to these callbacks, Tenant Schema must be created, In case of update, Tables should be updated for each of these tenants.

# Features shown in this service: 
- Tenant Registry Callback 
- Get Dependency Callback 
- HDI Container creation and DB artifacts deployments
- Cloudfoundry route creation. 


## Tenant Registry Callback
The registry callback is used to register the tenant with [SaaS Provisioning service](https://help.sap.com/docs/BTP/65de2977205c403bbc107264b8eccf4b/8be9a3a51232402082480914e020b2d3.html). 
Once registered, the applications's url is returned to the subscriber account. 
Tenant registry callback logic can be found here: [code](./routes/saasRoute.js#L20-L105)

## Get Dependency Callback
If the applicaiton has a re-use service like destination and connectivity service, the dependency callback is used to declare the those depdendencies in the SaaS provisioning service.
Any URL that the application exposes for GET dependencies. If the application does not have dependencies and the callback is not implemented, it should not be declared. Note:The JSON response of the callback must be encoded as either UTF8, UTF16, or UTF32, otherwise an error is returned. Important: You can either provide your own getDependencies Callback or use the default implementation of the AppRouter (recommended if no special logic is needed). But: If an own implementation is provided you have to make sure that the ABAP Solution instance is returned as a dependency.
The path is: `/callback/v1.0/dependencies`
The implementation can be seen in this [file](./routes/dependencyRouter.js#L13-L31).

## HDI Container creation and DB artifacts deployments
For a Multitenant application secure segregation of data is critical. This applicaiton uses `HANA database` with `HDI container` based data isolation. 
Each tenant has its own [`HDI container`](https://help.sap.com/docs/SAP_HANA_PLATFORM/4505d0bdaf4948449b7f7379d24d0f0d/e28abca91a004683845805efc2bf967c.html?version=1.0.12&locale=en-us) which is created and deployed during the provisioning. In this application, the [`@sap/instance-manager`](https://www.npmjs.com/package/@sap/instance-manager) library is used to create and manage `HDI containers`. The instance manager package provides credentias caching which helps in quick access of hdi credentials when the tenants are trying to access data. 
The instance manager logic to `create` `HDI containers` is implemented in this [file](./utility/instanceManager.js#L18-L40).

## Deploying the database artifacts(tables)
The database artifacts are deployed in the `HDI container` during the provisioning after the HDI container creation has been finished. 
The database artifacts are part of the [`Database Microservice`](../db). The DB service requires basic authentication along with the HDI container credentials in order to deploy tenant specific artifacts. Code implementaion can be found in this [file](./utility/dbHandler.js). Here's the function which is used to deploy the database artifacts:
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

