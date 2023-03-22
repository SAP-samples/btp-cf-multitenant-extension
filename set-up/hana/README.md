# Create an SAP HANA Cloud Instance

For this mission, we will use SAP HANA Cloud as our persistence layer. 
Directly navigate to step 9, If you have an SAP HANA Cloud instance in your subaccount.

Use the following steps to create an SAP HANA Cloud instance on SAP BTP:

1. Navigate to SAP HANA Cloud Subscription Application:

    1. In SAP BTP cockpit navigate to the **Services** &rarr; **Instances and Subscriptions** and **SAP HANA Cloud**.
    2. Select the three dots and choose **Go to Application**.

    ![HANA](./images/hanatools.png)

2. You will be logged in to SAP HANA Cloud Central. Choose **Create Instance**.

3. Choose the type of SAP HANA Cloud instance as **SAP HANA Cloud, SAP HANA Database** and select **Next Step**.

   ![HANA](./images/createDatabase02.png)

4. In the next tab, Enter an **Instance name**, enter a valid database **Administrator Password**, **confirm Administrator Password** and select **Next Step**.

   ![HANA](./images/createDatabase03.png)

5. Select the **Memory** and **Storage** capacity for your SAP HANA Cloud database instance. For this mission, you can choose the minimum capacity and select **Next Step**.

   ![HANA](./images/createDatabase04.png)

6. In the tab for Availability Zone and Replicas, you can leave the defaults and choose **Next Step**.

   ![HANA](./images/createDatabase05.png)

7. In the tab for SAP HANA Advanced Settings, choose **Allow all IP Addresses** and choose **Review and Create**.

   ![HANA](./images/createDatabase06.png)

8. Choose **Create Instance** to create an instance of SAP HANA Cloud Database instance.

    ![HANA](./images/createDatabase07.png)

    The creation of the instance will take some minutes.
