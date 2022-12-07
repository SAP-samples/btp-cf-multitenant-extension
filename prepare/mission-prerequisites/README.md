# Make Sure the Prerequisites Are Fulfilled and All Required Systems Are in Place

This section contains the prerequisites that you have to fulfil before you get started.

## Systems and Accounts

* [SAP S/4HANA](https://www.sap.com/india/products/s4hana-erp.html) system
* [Global account](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/8ed4a705efa0431b910056c0acdbf377.html?locale=en-US#loioc165d95ee700407eb181770901caec94) in SAP BTP
* Subaccount in SAP BTP with Cloud Foundry environment enabled

## Tools

* [Node.js](https://nodejs.org/en/download/) - find the latest Node.js version supported by [CAP](https://cap.cloud.sap/docs/advanced/troubleshooting#node-version).
* [Cloud Foundry command line interface (v7 version or later)](https://github.com/cloudfoundry/cli/wiki/V7-CLI-Installation-Guide).
* [Cloud MTA Build Tool](https://sap.github.io/cloud-mta-build-tool/) - you can install it using Node.js.
     
     ```cmd
     npm install -g mbt
     ```

* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [SAP Business Application Studio](https://help.sap.com/docs/SAP%20Business%20Application%20Studio) or another suitable IDE or editor of your choice
* Optional: Git repository 

## SAP BTP Provider Account

* Enable SAP BTP Cloud Foundry [global account](https://developers.sap.com/tutorials/cp-cf-entitlements-add.html).
* SAP BTP [subaccount](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/8ed4a705efa0431b910056c0acdbf377.html?locale=en-US#loio8d6e3a0fa4ab43e4a421d3ed08128afa)
* SAP BTP space

### Entitlements

The application requires the following entitlements in the SAP BTP cockpit:

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| SAP HANA Schemas & HDI Containers | hdi-shared |          1          |
| SAP HANA Cloud                    | hana       |          1          |
| Cloud Foundry runtime             | MEMORY     |          2          |
| Application Logging service       | lite       |          1          |
| Service Manager                   | Container  |          1          |
| SaaS Provisioning service         | Application|          1          |
| Connectivity service              | lite       |          1          |
| Destination service               | lite       |          1          |
| SAP Job Scheduling Service.       | Standard.  |          1          |

See [Entitlements and Quotas](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/00aa2c23479d42568b18882b1ca90d79.html?locale=en-US).

> **Note**
> 
>Instead of developing the application locally, you can use **SAP Business Application Studio** for a cloud-based development.
>When dealing with failover and performance in a productive setup, you would like to run multiple instances of the application. Therefore, you would need additional instances of the Cloud Foundry runtime.


## Prerequisites for SAP HANA Cloud

Make sure that you have an instance of SAP HANA database in your space. For more details, see [Create an SAP HANA Database Instance Using SAP HANA Cloud Central](https://help.sap.com/docs/HANA_SERVICE_CF/cc53ad464a57404b8d453bbadbc81ceb/21418824b23a401aa116d9ad42dd5ba6.html) in SAP Help Portal.

