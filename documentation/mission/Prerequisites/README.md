# Prerequisites

This section contains the prerequisites that you would have to get started.

## Prerequisites in General

* [SAP S/4HANA](https://www.sap.com/india/products/s4hana-erp.html) system
* SAP BTP Cloud Foundry [global account](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/8ed4a705efa0431b910056c0acdbf377.html?locale=en-US#loioc165d95ee700407eb181770901caec94).

## Prerequisites for Local Development

* [Node.js](https://nodejs.org/en/download/) - find the latest Node.js version supported by [CAP](https://cap.cloud.sap/docs/advanced/troubleshooting#node-version)
* [Cloud Foundry Command Line Interface (v7 version or above)](https://github.com/cloudfoundry/cli/wiki/V7-CLI-Installation-Guide)
* [Visual Studio Code](https://code.visualstudio.com/download) or another suitable IDE or editor of your choice

## Prerequisites for SAP BTP Provider Account

* Enable SAP BTP Cloud Foundry [global account](https://developers.sap.com/tutorials/cp-cf-entitlements-add.html).
* SAP BTP [subaccount](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/8ed4a705efa0431b910056c0acdbf377.html?locale=en-US#loio8d6e3a0fa4ab43e4a421d3ed08128afa)
* SAP BTP space

### Entitlements

The application requires the following set of SAP BTP [Entitlements and Quotas](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/00aa2c23479d42568b18882b1ca90d79.html?locale=en-US):

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| SAP HANA Schemas & HDI Containers | hdi-shared |          1          |
| SAP HANA Cloud                    | hana       |          1          |
| Cloud Foundry Runtime             | MEMORY     |          2          |
| Application Logging Service       | lite       |          1          |
| Service Manager                   | Container  |          1          |
| SaaS Provisioning Service         | Application|          1          |
| Connectivity Service              | lite       |          1          |
| Destination                       | lite       |          1          |


## Prerequisites for SAP HANA Cloud

Make sure that you have an instance of SAP HANA database in your space. For more details, see section [Create an SAP HANA Database Instance Using SAP HANA Cloud Central](https://help.sap.com/viewer/9ae9104a46f74a6583ce5182e7fb20cb/hanacloud/en-US/f7febb16072b41f7ac90abf5ea1d4b86.html) in the SAP HANA Cloud documentation.

