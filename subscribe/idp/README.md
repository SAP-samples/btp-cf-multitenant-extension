
# Configuring Custom Identity Provider

## Introduction

In this section, we would configure a custom Identity Provider which has the customer users/employees to login to the SAP Business Technology Platform subaccount.
Depending on your global account, you might see the default identity provider, which is configured automatically. This cannot be deleted, it can only be enabled or disabled. 

**Persona:** SAP BTP Administrator

## Step-by-Step

An SAML service provider interacts with an SAML 2.0 identity provider to authenticate users signing in by means of a single sign-on (SSO) mechanism. In this scenario, the SAP UAA service (User Account and Authentication Service) acts as a service provider representing a single subaccount. To establish trust between an identity provider and a subaccount, you must provide the SAML details for web-based authentication in the identity provider itself. Administrators must configure trust on both sides, in the subaccount of the service provider and in the SAML identity provider. Here we assume that the customer has purchased a tenant for SAP Cloud Identity Authentication service.

### Register SAP BTP subaccount in the Custom SAML 2.0 Identity Provider

You can manage trust configurations for a global account only if you have created the global account or if you are an SAP BTP administrator of the account and you are an administrator in the company's Identity and Authentication tenant (SAP IAS).


1. Select the customer subaccount.
2. Select Security > Trust Configuration from left pane. 
3. Choose **SAML Metadata** button and download the XML file.
   
   ![Download XML](./images/CustIDP-SAML.png)
   
4. Now, open the company's Identity and Authentication Tenant (SAP IAS) and login to the same.
5. Select **Application & Resources** > Application from left pane.
6. Choose **Create**.
   
   ![Add App](./images/CustIDP-addApp.png)
   
7. Enter Name. For eg., **Easy Franchise** and choose **SAP BTP solution** as **Application Type**
8. Press **Save**.

   ![Save App](./images/CustIDP-saveApp.png)
9. Choose **SAML 2.0 Configuration** under Trust Tab.
   
   ![Configure SAML](./images/CustIDP-configureSAML.png)
10. Seletct **Browse** for Metadata file upload. Choose the metadata xml file downloaded from previous step number 3.

   ![Save SAML](./images/CustIDP-saveSAML.png)   

11. Choose on **Save**.

12. Choose on **Subject Name Identifier**
    
   ![Subject NameID](./images/CustIDP-subjectNameID.png) 
   
13. Select basic attribute as E-mail and choose **Save**.
   
   ![Save Subject NameID](./images/CustIDP-subjectNameIDSave.png) 

14. Select Assertion Attributes
    
   ![Assertion Attributes](./images/CustIDP-addAssertion.png) 

15. Click on **Add** and select the Groups attribute, set the assertion attribute to "Groups" with capital G. Press **Save**
 
   ![Set Assertion Group](./images/CustIDP-addGroupAssertion.png)  

16. In the Home view select User Groups

   ![User Groups](./images/CustIDP-addGroups.png)

17. Create a Easy Franchise group. 
    * Select **Create**
    * Set Name = EasyFranchise
    * Set Display name = EasyFranchise
    * Enter a description
    * Press **Create**

   ![User Groups](./images/CustIDP-addGroups2.png)

  
18. Map the group to a user which should have the UX extension developer role. 
    * Open User Management
    * Select the user  
    * Click on User Groups
    * Press **Assign Groups**
   
   ![User Groups](./images/CustIDP-assertGroup.png)

19. Check the EasyFranchise group and click on **Save**.
   
   ![User Groups](./images/CustIDP-assertGroup2.png)

    
21. Repeat the last 2 steps by mapping the **EasyFranchise** group to all users that should have access to the Easy Franchise application. 

### Establish Trust with a custom SAML 2.0 Identity Provider in your Subaccount
You have your company's SAML 2.0 identity provider, for example, SAP Cloud Identity Authentication service. This is where your business users are stored. You must establish a trust relationship with your custom SAML 2.0 identity provider in your subaccount in SAP BTP. The following procedure describes how you establish trust in the SAP Cloud Identity Authentication service.

1. Click on **Application & Resources** > Tenant settings from the left pane.
2. Click on SAML 2.0 Configuration.

   ![Download SAML](./images/CustIDP-IAS-SAML.png) 
   
3. Click on Download Metadata file button.

   ![Download SAML](./images/CustIDP-downloadIAS-SAML.png)
   
4. Now, login again to the customer SAP BTP subaccount and choose Security > Trust Configuration.
5. Choose **New Trust Configuration**.
 
   ![Configure Trust](./images/CustIDP-configurenewTrust.png)
   
6.Press **Upload** to upload metadata file. Choose the Tenant metadata file downloaded from previous step.
7. Enter Name. For eg., **ExtendUI-Tenant**
   
   ![Configure Trust](./images/CustIDP-configurenewTrust1.png)
   
8. Press **Save**.
9. Now assign the group we have created at the Identity Provider to the role collection of the EasyFranchise application. In the SAP BTP cockpit select **Security - Role Collection**. Choose **Coordinator** and press **Edit**. In the User Groups section select your Identity Provider and map it to the **EasyFranchise** group. Press **Save**. 

   ![Assign Role](./images/CustIDP-assignRole.png)


### References
Check the [official SAP Help documentation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/7c6aa87459764b179aeccadccd4f91f3.html).
