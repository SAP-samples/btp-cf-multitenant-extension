# Run the Easy Franchise Application 

To run the Easy Franchise application, follow these steps:

1. In the SAP BTP cockpit, navigate to your subaccount and choose **Services** > **Instances and Subscriptions**.
2. Choose **Easy Franchise**.
3. Choose **Go to Application**.
   ![Go to app](./gotoApplication.png)
   
4. You will load the Easy Franchise multitenant application. 
   ![inital app](./initialapp.png)


At this step, you are ready to run the application. To customize the application with a subscriber-specific title and icons, you need to follow the steps below.

## Customizing the application
Each tenant needs to have a unique title and icon. To customize the application, follow these steps:

1. Change the appication URL, add `/adminui/` after `.com`. It will look like this: `https://<your-subaccount>.com/adminui/`.
2. Change the application logo by choosing **Browse** and selecting the logo.
3. Choose **Upload** to upload the logo.
   ![logo upload](./uploadlogo.png)
   
4. Enter the title for the subscriber tenant. Choose **Save**.
    
5. Create new mentors by choosing `+`. Fill in the required details. 

Once you are ready with the customization, you can go to the main applicaiton. Now the customized application has its own title and logo uploaded from the admin corner.
![Changed Logo](./changedlogo.png)
