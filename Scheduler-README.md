# Understand the usage of SAP Job Scheduling Service 

The Scheduler service is a microservice responsible for scheduling and executing jobs to fetch new franchises (Business Partners) created in the SAP S/4HANA system. This helps keeping the list of Business Partners up to date, new mentors are not assigned in this list. 

# SAP Job Scheduling Service
SAP Job Scheduling service allows you to define and manage jobs that run once or on a recurring schedule. Use this runtime-agnostic service to schedule action endpoints in your application or long-running processes using Cloud Foundry tasks. Use REST APIs to schedule jobs, including long-running jobs asynchronously, and create multiple schedule formats for simple and complex recurring schedules. Manage jobs and tasks and manage schedules with a web-based user interface.

[Read More](https://help.sap.com/docs/JOB_SCHEDULER/07b57c2f4b944bcd8470d024723a1631/22c2df4d22cb4a05af4c9502a67597ae.html)


# Multitenancy in SAP Job Scheduling Service 
The SAP Job Scheduling service allows invocation of job actions in the context of Platform-as-a-Service (PAAS) or Software-as-a-Service (SaaS) tenants.

This means that a deployed multitenant application can create/view/edit/delete jobs in the context of tenants, which have subscribed to it. To support a multitenancy scenario, a multitenancy provider application must be deployed and bound to instances of both the SAP SaaS Provisioning service and the SAP Job Scheduling service and define the SAP Job Scheduling service as a dependency.

[Read More](https://help.sap.com/docs/JOB_SCHEDULER/07b57c2f4b944bcd8470d024723a1631/464b6130857c4bc98af21a0b528cd35a.html?q=multitenancy)


