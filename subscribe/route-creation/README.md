# Tenant Specific Route Creation
Once you create the application and try to launch it, you get an error like this.
![404 route](./route.png)

This error occurs because there is no application with this route deployed yet. Now you need to create a route for this subaccount and target it to the approuter. The approuter later will route the traffic to the application using the tenant host pattern. More details can be found in the [approuter documentation](../../../tree/main/approuter/README.md).  
Rotue creation can be done automatically or with Cloud Foundry APIs during onboarding, or via CLI/ manually. Let's check how to do it manually. 
# Route Creation Option 1 using BTP Cockpit

1. Go to the provider subaccount. 
2. Open the cloud foundry space where the multitenant application is deployed.
3. Click on Routes on the left side and then click on `New Route`.
4. Select the CF landscape from the dropdown. You can refer to the above picture section 2 for more details.
5. Enter your subaccount specific route. You can refer to the above picture's section 1 for more details.
6. Click on Save. 
   ![Create Route](./createRoute.png)

7. Now from the list of created routes, select the newly created route. 
8. Choose the map route icon from `Actions` tab. 
9. Select the approuter and then click on `Save`.
    
   ![Create route](./bind-route.png)

With this you are ready to run the application. 

# Route Creation Option 2: Using Cloud Foundry CLI
The Route Creation can be done using the Cloud Foundry CLI. Here's a quick guide to do it. Please alter the host name and app name as per your deployed application's host and domain.
1. Login to your provider CF space where the multitenant application is deployed.
2. Run the following command:
   
   `cf map-route approuter cfapps.eu12.hana.ondemand.com --hostname subscriber-subaccount-dev-approuter`.

   Here the approuter is the name of the approuter app. The `cfapps.eu12.hana.ondemand.com` is the domain of the approuter app. The `--hostname` is the hostname obtained after subscribing to the approuter.
   Please refer to the below picture for more details.
   ![Route](./route.png)

   The output of the command is:

   ![cli route](./cliroute.png)

Now you can run the application.

# Route Creation Option 3: Using Cloud Foundry APIs during (Onboarding)
Another option to create the routes are to use the Cloud Foundry APIs during onboarding. Different api calls can be used to create the route and map it to the approuter. 
Here's the [API Reference](https://v3-apidocs.cloudfoundry.org/version/3.117.0/index.html#the-service-route-binding-object).
