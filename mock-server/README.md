# s4hana-cloud-mock

This project implies to work as SAP S/4HANA Cloud Mock backend server for the Reference Applications use cases.

The project is built on Cloud Application Programming (CAP) model with mocking capabilities.

## Usage

Build the application
    
        cds build --production

Enter the Event Mesh service instance of the consumer CAP application in the `manifest.yml` inside the generated `gen` folder.

Deploy the application

        cf push -f gen/srv

