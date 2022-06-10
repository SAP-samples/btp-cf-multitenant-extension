# Scheduler

This microservice is responsible for scheduling and executing jobs to fetch new franchises(Business Partners) created in the S/4HANA System. This helps in keeping the list of Business Partners up to dated to whom new mentors are to be assigned. 

## Scheduling Logic 
For creating the scheduler we are using nodejs package [`node-cron`](https://www.npmjs.com/package/node-cron).
Currently the app if configured with 2 minutes interval to fetch the new Business Partners. Ideally it should be a nighlty job. Code can be found in the [`./index.js`](./index.js#L11-L14) file. Below is the code snippet. The default value can be changed by replacing `*` with standard values mentioned in the [`node-cron`](https://www.npmjs.com/package/node-cron) documentation.

```javascript

cron.schedule('*/2 * * * *', () => {
    fetchTenants();
    console.log('running a job every 2 minute');
  });
```
## Fetching new Business Partners
To fetuch business partners for each of the subscribers from their respective S/4HANA System. We are using `admin` table which has tenant specific information like tenant id, subdomain. We need the subdomain in order to generate tenant specific oauth token. As we have declared `destination` and `connectivity service` we are able to use the same service keys in combination with the tenant specific subdomain to generate the oauth token.

First we fetch the list of subscribers from the `admin` table. Then we loop through each of them to generate their oauth tokens and then fetch the list of Business Partners from their respective S/4HANA System.
[Here's code sample for fetching the oAuth Token. ](./util/jwt.js#L11)

Once we have the tenant specific oauth token we can fetch the list of Business Partners from their respective S/4HANA System using the [`Business Partner Service`](../businessPartner/). 
Here's the [`link to function`](./srv/fetchTenants.js#L22-L47) that fetched the list of Business Partners

## Writing Job Logs 
As an adminstrator of this applciation it's important to know the status of the jobs. This is to ensure that the scheduler is working as expected of if there's any issue with the subscribers. This is to be done by writing the logs in the [`EF.jobs`](../admin-db/src/data/Jobs.hdbtable) table.




