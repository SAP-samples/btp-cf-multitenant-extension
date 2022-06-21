# Understand the Approuter

When a business application consists of several different applications (microservices), the application router is used to provide a single entry point to that business application. It has the responsibility to:

- Dispatch requests to backend microservices (reverse proxy)
- Authenticate users
- Serve static content

Read more about the approuter application at [https://www.npmjs.com/package/@sap/approuter](https://www.npmjs.com/package/@sap/approuter).  

The application router should be configured to handle multitenant access by maintaining the `TENANT_HOST_PATTERN` environment configuration.
See [SaaS Application Registration in Cloud Foundry](https://www.npmjs.com/package/@sap/approuter#saas-application-registration-in-cloud-foundry).

To run the approuter locally, we need to create a file named `default-env.json` in the root of the project. The file should have `VCAP_Services` with service keys under it. This can be obtained by deploying the approuter application along with its dependent services in the Cloud Foundry environment.

## Configurations
[`xs-app.json`](https://www.npmjs.com/package/@sap/approuter#xs-appjson-configuration-file) is used to configure different routes for the application.

