# Tenant Provisioning 
Once the multitenant application is deployed, the tenant provisioning process is initiated.

Tenant provisioning is a process that allows the tenant to be created and configured. Here each tenant refers to individual subscribers/customers.

## Create Subaccount 
The tenant provisioning process is initiated by the administrator. The **subscriber subaccount** is created inside the global account with the **same region where the application is deployed**. A multitenant deployed in a region for example **us-east-1** will create a subaccount in the **us-east-1** region. In any other region the multienant application will not be visible.

## Creating the subaccount.
The subaccount creation requires a global account to be pre-created with multitenant applicaiton already deployed. 
Once you are in the global account. Follow the below steps.
1. Click on `Create`. It's visible at the Account Explorer at subaccount level.
2. Now a popup will come. Enter the name of the subaccount.
3. Select the Region. Please Ensure the region is same as the region where the multitenant application is deployed.
4. Click on `Create`.

![Subaccount Creation](./images/createsubaccount.png)

