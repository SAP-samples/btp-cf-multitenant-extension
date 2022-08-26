# Business Scenario 
The below picture represents various layers of this solution. Top level is the provider of multitenant application. Middle layer has the subscriber and at bottom is the new franchises. 
![Persona Overview](./images/EasyFranchise%20persona.png)


### SAP Partner ​

The company Easy Franchise is an SAP partner providing a multitenant SaaS extension application for SAP S/4HANA called Easy Franchise, that allows you to onboard new business partners easily. ​

- The extension application helps with:​

    - Assigning a mentor for each new business partner, that is added in the SAP S/4HANA system.​

    - Searching for suitable trainings based on the business partner profile/skill, using data from SAP SuccessFactors and machine learning (out of scope for June).​

    - Sending a notification to the respective mentor about their assignment, so that they can prepare the next onboarding steps.​

    - Collecting standard information/guidelines in one central place that can be shared with the new franchise company.​

> **Application Interface Register for SAP Integration (AIR KEY)**
> 
> Partner building solutions that integrate or connect to SAP LoB Applications via APIs MUST include the
Application Interface Key provided by SAP in the API Header. [Know More](https://d.dam.sap.com/e/7XcJ73S/AIR%20Adoption%20Guide%20LATEST.pdf)
>
> All partners who complement SAP Application’s features by extending them, are applicable for SAP PE Build Partnership. This is for SAP PE Build Partners that uses API’s to get and post data to/from SAP applications. A very important announcement targeted towards SAP PE Build Partners was made in November 2020. The announcement made in the SAP Partner Portal was to notify that from February 15th, 2021, a Unique Integration Key provided by SAP must be used by all PE Build Partner’s Solution that integrates or connects to SAP Applications through APIs. This is also called the Application Interface key. This unique key must be used in the API Header.
### SAP Customers​

City Scooter, Bike Sharing and Car Renting are three different companies renting electric vehicles to franchise companies. ​
In order to speed up the onboarding of new franchises, each of them purchased the Easy Franchise application. ​
Each one of these companies has their own SAP S/4HANA system which would be connected to the Easy Franchise application.


### Franchise Companies​

Franchise companies are business partners that are taken over the business-to-consumer. They're responsible for managing the vehicles part in a defined region (for example, in the same city or in several cities).

- Not relevant in our scenario​

## Business Story

![Business Story](./images/Business%20Story.png)
