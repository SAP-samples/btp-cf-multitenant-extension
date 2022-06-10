# Admin DB

The Purpose of this repository is to store teanant specific metadata like subaccount and tenant id. This information is later used by job scheduler to run syncronization job to fetch newly created franchisees and update notifications. 

## Table information 
The metadata table has the following fields:
- TENANTID - The unique identifier of the tenant.
- SUBACCOUNTID - The unique identifier of the subaccount. Used to generate Tenant specific authentication token. 
- SCHEDULE - Frequency to run the jobs
- JOB_ID - Id of the last sync job run.
- JOB_STATUS - Status of the last job run.
- JOB_TIMESTAMP - Timestamp of the last job run.
  