# Approuter Module

When a business application consists of several different apps (microservices), the application router is used to provide a single entry point to that business application. It has the responsibility to:

- Dispatch requests to backend microservices (reverse proxy)
- Authenticate users
- Serve static content

Read more about Approuter at [https://www.npmjs.com/package/@sap/approuter](https://www.npmjs.com/package/@sap/approuter).  

## Multi-tenancy configuration in approuter
The application router should be configured to handle multi-tenant access by maintaining the `TENANT_HOST_PATTERN` environment configuration.
[Read More](https://www.npmjs.com/package/@sap/approuter#saas-application-registration-in-cloud-foundry)

## Local development
To run the approuter locally, we need to create a file named `default-env.json` in the root of the project. The file should have `VCAP_Services` with service keys under it. 
This can be obtained by deploying approuter along with it's dependent services in the cloud foundry.

## Configurations
[`xs-app.json`](https://www.npmjs.com/package/@sap/approuter#xs-appjson-configuration-file) is used to configure different routes for the application.