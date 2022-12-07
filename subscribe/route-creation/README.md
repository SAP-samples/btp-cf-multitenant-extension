# Create Tenant-Specific Route

Once you create the application and try to launch it, you get the following error.
![404 route](./route.png)

This error occurs because there's no application with this route deployed yet. Now, you need to create a route for this subaccount and target it to the approuter. The approuter will then route the traffic to the application using the tenant host pattern. See the [approuter documentation](../../../../tree/main/approuter/README.md).  
You can create the route automatically or with Cloud Foundry APIs during onboarding, or manually using the Cloud Foundry command-line interface(cf CLI).

# Option 1: Using SAP BTP Cockpit

1. In the SAP BTP cockpit, navigate to the provider subaccount. Provider Subaccount is the place where the multitenant applications will be deployed. 
2. Choose **Cloud Foundry** > **Spaces**, and then choose the space where the Easy Franchise application is deployed.
4. Choose **Routes**, and then choose **New Route**.
5. Select the domain from the dropdown menu.
6. Enter your subaccount-specific route.
7. Choose **Save**.
   ![Create Route](./createRoute.png)

7. From the routes list, select the route you created. 
8. Choose **Actions** > **Map Route**. 
9. From the **Application** dropdown menu, select **easyfranchiseapprouter**. Choose **Save**.
    
   ![Create route](./bind-route.png)

You're ready to run the application. 

# Option 2: Using Cf CLI
You can create the route using the cf CLI. Change the hostname and the application name depending of the host and domain of your deployed application.

1. Log in to cf CLI and navigate to your provider's Cloud Foundry space where the Easy Franchise application is deployed.
2. Run the following command:
   
   `cf map-route approuter cfapps.eu12.hana.ondemand.com --hostname subscriber-subaccount-dev-approuter`

   where:
   * The approuter is the name of the approuter application
   * The `cfapps.eu12.hana.ondemand.com` is the domain of the approuter application
   * The `--hostname` is the hostname obtained after subscribing to the approuter
  
   ![Route](./route.png)

   The output of the command looks like this:

   ![cli route](./cliroute.png)

You're ready to run the application. 

# Option 3: Using Cloud Foundry APIs
Another option to create the route is to use the Cloud Foundry APIs during onboarding. Different API calls can be used to create the route and map it to the approuter. 
See the [API Reference](https://v3-apidocs.cloudfoundry.org/version/3.117.0/index.html#the-service-route-binding-object).
