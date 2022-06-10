# Configure the connectivity between SAP S/4HANA Cloud and SAP BTP

To integrate the cloud platform and SAP S/4HANA Cloud so that you can build extension applications, you need to:
1. Connect the SAP S/4HANA Cloud system you want to extend with the corresponding global account in SAP BTP. See [Register an SAP S/4HANA Cloud System in a Global Account in SAP BTP](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/28171b629f3549af8c1d66d7c8de5e18.html).
2. Make the SAP S/4HANA Cloud system accessible in the SAP BTP subaccounts in which you want to build your extension applications. See [Configure the Entitlements for the SAP S/4HANA Cloud Extensibility Service](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/65ad330d11ac49a196948aa8db6470fb.html).
3. Configure the communication flow. You have the following options:
    * Consume the SAP S/4HANA Cloud APIs (inbound connection) or consume APIs exposed by the extension application from SAP S/4 HANA Cloud (outbound connection). See [Creating a Service Instance to Consume the SAP S/4HANA Cloud APIs](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/a735641b4c944953a3aedc887b2f250c.html).
    * Enable the consumption of SAP S/4HANA Cloud events. See [Enable the Consumption of SAP S/4HANA Cloud Events](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/d476ff058bf1413a9505c5c25cfce86b.html).
    * A combination of both
