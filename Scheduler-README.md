# Understand the Scheduler Service

The Scheduler service is a microservice responsible for scheduling and executing jobs to fetch new franchises (Business Partners) created in the SAP S/4HANA system. This helps keeping the list of Business Partners up to date, new mentors are not assigned in this list. 

## Scheduling Logic 
For the Scheduler service, we are using the [`node-cron`](https://www.npmjs.com/package/node-cron) Node.js package.
Currently, the application if configured with 2 minutes interval to fetch the new Business Partners. Ideally, it should be a nightly job. You can find the code in the [`./index.js`](./index.js#L11-L14) file. The default value can be changed by replacing `*` with the standard values mentioned in the [`node-cron`](https://www.npmjs.com/package/node-cron) documentation.

This is the code snippet:

```javascript

cron.schedule('*/2 * * * *', () => {
    fetchTenants();
    console.log('running a job every 2 minute');
  });
```
## Fetching New Business Partners
To fetch Business Partners from each of the subscriber subaccount connected to SAP S/4HANA systems. We are using the `admin` table which has a tenant-specific information like tenant ID, and subdomain. We need the subdomain to generate tenant-specific OAuth token. 
As we have declared `destination` and `connectivity `service` as a dependency to the multitenant application, this allows the same service keys in combination with the tenant-specific subdomain to generate the OAuth token for each subscriber subaccount.

First, we fetch the list of subscribers from the `admin` table. Then, we loop through each of them to generate their OAuth tokens and then fetch the list of Business Partners from their respective SAP S/4HANA system.
[Here's code sample for fetching the oAuth Token. ](./util/jwt.js#L11)

Once we have the tenant-specific OAuth token, we can fetch the list of Business Partners from their respective SAP S/4HANA system using the [`Business Partner Service`](../businessPartner/). 
Here's the [`link to function`](./srv/fetchTenants.js#L22-L47) that fetches the list of Business Partners.

## Writing Job Logs
As an administrator of this application, it's important to know the status of the jobs. This is to ensure that the scheduler is working as expected or if there's any issue with the subscribers. This is to be done by writing the logs in the [`EF.jobs`](../admin-db/src/data/Jobs.hdbtable) table.




