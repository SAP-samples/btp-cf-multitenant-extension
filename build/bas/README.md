# Build and Deploy the Easy Franchise Application

For building and deploying the application, we use the Multitarget Application (MTA). You can either use your local environment or SAP Business Application Studio. 

## Clone the Resources

You get the Easy Franchise sample application from our git repository:

Open a terminal or your command line interface and clone the application:

```cmd
git clone https://github.com/SAP-samples/btp-cf-multitenant-extension.git
``` 

## Configure the Application
As we want to roll out the Easy Franchise application as a SaaS solution, we have to make the name of the solution unique for your account.   

1. Open the **mta.yaml** file. In the **SaaS registry Service** section, change the **xsappname** and **appName** parameters to your preferred name. 

```yaml
## SaaS registry Service
  - name: es-saas
    type: org.cloudfoundry.managed-service
    requires:
      - name: onboarding-api
    parameters:
      service: saas-registry
      service-plan: application
      config:
        xsappname: easyfranchise-yourname
        appName: easyfranchise-yourname
        displayName: Easy Franchise
        description: Multitenant Rental applicaition
        category: 'Refapps'
        appUrls:

```
2. Open the **./configuration/xs-security.json** file. Again, change the **xsappname** to the same value as in the mta.yaml.

```json

    "xsappname": "easyfranchise-yourname",
    "tenant-mode": "shared",
    "description": "Security profile of Easy Franchise",
    "authorities":["$ACCEPT_GRANTED_AUTHORITIES"],
    "scopes": [

```
3. Save your changes.


## Build the Application

Build your application by using the mta.yaml build file. With the -t parameter, the file will be created in the specified folder.

```cmd
mbt build -t ./mta_archives

```

### Log In to Your Subaccount in SAP BTP

1. Set the SAP BTP API endpoint. You find it in the overview of your subaccount in SAP BTP.

    ![api](./images/logon.png)

    ```cmd
    cf api <your-api endpoint>
    ```

2. Log in to your subaccount and space:

   ```cmd
   cf login -u <your-user> -p <your-password>

   -- then select your org and space
    ```


### Deploy the MTA Archive

Now, you can deploy the application in your subaccount and space by using the MTAR file you just created:

```cmd
cd mta_archives
cf deploy easyfranchise_1.0.0.mtar
```
If the deployment is successful, you can check in the **Applications** section of your space if all the modules are running (exception: admin-db is only in `Running` state during deployment and is then it goes to `Stopped` state once the database artifacts are deployed successfully).

![apps](./images/apps.png)


