# Configure the connectivity between SAP Customer Experience and SAP BTP

To integrate SAP BTP and SAP Customer Experience products so that you can build extension applications, you need to perform the following tasks:
1. Connect the SAP Customer Experience system you want to extend with the corresponding global account in SAP BTP. See [Register an SAP Customer Experience System](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/1582d723f3814d30beba5fc0daa0bb0d.html).
2. Configure the integration on SAP Customer Experience side.
    * For an SAP Commerce Cloud system, see steps 2-7 in [Retrieving Client Certificate](https://help.sap.com/viewer/bad9b0b66bac476f8a4a5c4a08e4ab6b/v2011/en-US/becb28f8b8ee45d496ba968a4e3a6f28.html).
    * For an SAP Field Service Management system, see [SAP BTP Extensions](https://help.sap.com/viewer/fsm_extensions/LATEST/en-US/kyma-connector.html).
    * For an SAP Cloud for Customer system, see **SAP BTP Extensions: Step 2 Configuration in SAP Cloud for Customer Event Notifications** in [Configure an Event Notification](https://help.sap.com/viewer/d5fec61c279741048109d851d4d3d1ad/latest/en-US/a84a5e9266264af8ac32fe627de10bd7.html).

3. Assign the SAP Customer Experience system to a formation to enable the API access to the corresponding SAP Customer Experience product's APIs. See [Assigning SAP Systems to a Formation](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/68b04fa73aa740cb96ed380a85a4761a.html).
4. Create a service instance of the required SAP Customer Experience Cloud services in the Kyma Service Catalog. See [Provisioning and Binding Flow](http://help.sap.com/disclaimer?site=https://kyma-project.io/docs/components/service-catalog#details-provisioning-and-binding-flow).
      **Note**. When the **KymaRuntimeNamespaceAdmin** binds a service to the Namespace, the credentials are made available to the **KymaRuntimeNamespaceDevelopers** who have access to this Namespace.
