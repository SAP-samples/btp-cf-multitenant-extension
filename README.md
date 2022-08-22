[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/btp-cf-multitenant-extension)](https://api.reuse.software/info/github.com/SAP-samples/btp-cf-multitenant-extension)


# Nodejs Multitenant Easyfranchise 
Nodejs based application showcasing Multi-tenant capabilities offered by SAP Business Technology Platform to build extensions.

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

In this tutorial, we will be using some keywords like provider account, subscriber account, provisioning, onboarding and data isolation. 
Let's start with the **Provider** account.
A provider is the vendor of the application. Persona is going to build, deliver and operate the multitenant saas solution for all the subscribers.

**Subscriber** is the consumer of the application. Persona who is going to use the multitenant SaaS solution.

**Provisioning** is the process of onboarding new subscribers to the multitenant SaaS solution. During the provisioning process, tenant database schema is created, any dependency is injected into the subscriber subaccount.


## BTP multitenancy model - Provider's point of view 
![Account Model](/documentation/images/account%20model.png)

## Database Schema Segregation Recommendation
There are multiple ways to achieve database schema segregation. The recommendation is to have a dedicated database schema for each tenant. In this tutorial, we will be using 'hdi-container' based model for database schema segregation. This provides a unique database schema and credentials for each of the tenants ensuring additional security and data isolation.

![Database schema recommendation](/documentation/images/tenant%20data%20seperation.jpeg)



# Business Scenario
The below picture represents various layers of this solution. Top-level is the provider of multitenant applications. The middle layer has the subscriber and at the bottom is the new franchises.

![Persona Overview](/documentation/images/EasyFranchise%20persona.png)


### SAP PARTNER ​

- EasyFranchise is a Partner providing a multitenant SaaS extension for S/4 HANA named EasyFranchise App, that allows to onboard new business partners more easily. ​

- The extension application allows:​

    - To assign a mentor for each new business partner, that is added to the S/4HANA system​

    - To search for suitable training based on the business partner profile/skill, using data from SFSF and machine learning (out of scope for June)​
    - To send a notification to the respective mentor about his assignment, so that he can prepare the next onboarding steps​
    - To collect standard information/guidelines in one central place that will be shared with the new franchise company​

### SAP CUSTOMERS​

- CityScooter, BikeSharing and CarRenting are 3 different companies renting electric vehicles to franchise companies. ​
- To speed up the onboarding of new franchisees, each of them purchased the partner EasyFranchise application. ​

### FRANCHISE COMPANIES​

- Franchise companies are respective business partners that are taking over the B2C​

- They are responsible for managing the vehicles parc in a defined region (e.g one or more cities)​

- Not relevant in our scenario​

## Business Story

![Business Story](/documentation/images/Business%20Story.png)
​
# Solution Diagram 
![Solution diagram](/documentation/images/Slide5.jpg)

# Technical Architecture Modeling (TAM) Diagram
The below diagram explains various data flow directions and components part of the application. On the right side, we have the Subscriber's S/4 HANA System connected to the Multitenant solution on the left side of the diagram.

![TAM](/documentation/images/tam.png)


# Solution Highlights
- Multitenancy (tenant-specific access)
- Authentication and authorization of users
Service Manager implementation for Schema creation and access
- Database Credentials Caching for faster access
- Tenant provisioning
- Re-use service dependency callback implementation
- Usage of SAP Cloud SDK to read/write data from S/4HANA

# Requirements 
- SAP BTP Account
- SAP BTP Cloud Foundry Runtime 
- HANA Cloud
- SAP Service Manager Entitlement
- S/4HANA System
- Cloud Connector
- [SAP Cloud SDK](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [Cloud Foundry CLI](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html)
- [Nodejs](https://nodejs.org/en/download/)
- Code Editor of your Choice

# Exercise

1. [Get Started](../../tree/mission/README.md)


## Known Issues

If service instance creation is failing, refer to the deploy phase of the application and check if you have changed the `xsappname` of XSUAA and SaaS Provisioning Service.



## How to obtain support
[Create an issue](https://github.com/SAP-samples/btp-cf-multitenant-extension/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## Contributing
If you wish to contribute code or offer fixes or improvements, please send a pull request. Due to legal reasons, contributors will be asked to accept a DCO when they create the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## License
Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
