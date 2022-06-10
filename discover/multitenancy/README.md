## Develop the Multitenant Application

In the Cloud Foundry environment of SAP BTP, you can develop and run multitenant applications that can be accessed by multiple consumers (tenants) through a dedicated URL.
## Context
When developing tenant-aware applications in the Cloud Foundry environment, keep in mind the following general programming guidelines:

- Shared in-memory data such as Java static fields will be available to all tenants.

- Avoid any possibility that an application user can execute custom code in the application JVM, as this may give them access to other tenants' data.

- Avoid any possibility that an application user can access a file system, as this may give them access to other tenants' data.

- To perform internal tenant onboarding activities, such as creating a database schema for tenants, you must implement the Subscription callbacks of the SAP Software-as-a-Service Provisioning service (saas-registry) and use the information provided in the subscription event. You can also implement the getDependencies callback to obtain the dependencies of any SAP reuse services by your application. See details in the procedure below.

[Further Read](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/ff540477f5404e3da2a8ce23dcee602a.html)

## SAP BTP Multitenancy Model

In this tutorial we will be using some keywords like provider account, sunscriber account, provisioning, onboarding and data isolation. 
Let's start with the **Provider** account.
A provider is the vendor of the application. Persona who is going to build, deliver and operate the multitenant saas solution for all the subscribers.

**Subscriber** is the consumer of the application. Persona who is going to use the multitenant SaaS solution.

**Provisioning** is the process of onboarding new subscriber to the multitenant SaaS solution. During provisioning proccess, tenant database schema is created, any dependency is injected into the subscriber subaccount.

## BTP multitenancy model - Provider's point of view 
![Account Model](./images/accountmodel.png)

## Database Schema Segregation Recommendation
There are multiple ways to achieve database schema segregation. The recommendation is to have dedicated database schema for each tenant. In this tutorial we will be using 'hdi-container' based model for database schema segregation. This provices unqiue database schema and credentials for each of the tenant ensuring additional security and data isolation.

![Database schema recommendation](./images/tenantdataseperation.jpeg)