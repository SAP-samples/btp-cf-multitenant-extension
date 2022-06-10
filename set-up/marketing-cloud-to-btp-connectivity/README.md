# Configure the connectivity between SAP Marketing Cloud and SAP BTP

To integrate the cloud platform and SAP Marketing Cloud so that you can build extension applications, you need to:
1. Connect the SAP Marketing Cloud system you want to extend with the corresponding global account in SAP BTP. See [Register an SAP Marketing Cloud System in a Global Account in SAP BTP](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/e9d975a45c954501bbe59e39dfb468c0.html).
2. Make the SAP Marketing Cloud system accessible in the SAP BTP subaccounts in which you want to build your extension applications. See [Configure the Entitlements for the SAP S/4HANA Cloud Extensibility Service](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/65ad330d11ac49a196948aa8db6470fb.html).
3. Configure the communication flow. You have the following options:
    * Consume the SAP Marketing Cloud APIs (inbound connection) or consume APIs exposed by the extension application from SAP Marketing Cloud (outbound connection). See [Creating a Service Instance to Consume the SAP S/4HANA Cloud APIs](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/a735641b4c944953a3aedc887b2f250c.html).
    * Enable the consumption of Marketing Cloud events. See [Enable the Consumption of SAP S/4HANA Cloud Events](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/d476ff058bf1413a9505c5c25cfce86b.html).
    * A combination of both
