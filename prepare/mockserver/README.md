# Install Mock Server

If you don't have access to an SAP S/4HANA system but still want to create an application consuming an OData service with SAP AppGyver, you can use this mock server application. It contains some entities of the SAP S/4HANA API_Business_Partner OData service (A_BusinessPartner & A_BusinessPartnerAddress) with sample data.


To install the mock server, you need an SAP BTP subaccount with **Cloud Foundry Environment** and **256 MB of Cloud Foundry runtime**.

## Installing the Mock Server

1. To install the mock server open **mock-server** directory in your terminal. 
2. Run the command `cf push` in terminal.
3. Once the application is deployed, Copy the URL of deployed application. 
4. Go to the **Subscriber Subaccount**
5. Replace the destination with URL of your mock server.
6. Append **/odata/v2** at the end of mock server URL as S/4HANA requires OData V2 format data.
The configuration should look like this:
   ![Mock Destination](./mock%20url.png)


## Creating Mock Data
To create new business partners in the mock application you need to create some mock data. This step requires the file to be opened on Business Application Studio or any other code editor of your choice.
1. Open the file `req.http`
2. Modify the URL placeholder for the mock server with the URL of the deployed mock server.
   ```

        {
            "BusinessPartner":"123123",
            "BusinessPartnerFullName":"Mock BP",
            "FirstName": "MOCK BP",
            "SearchTerm1" : "EFVERIFIED"
        }
   ```
3. Hit Post to create an entry. 
4. Open the mock server URL to validate if the mock business partner has been created. 
