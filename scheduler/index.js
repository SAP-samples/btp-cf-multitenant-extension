const express = require('express');
const cron = require('node-cron');
const xsenv = require('@sap/xsenv');
const app = express();

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'dev') xsenv.loadEnv();

const fetchTenants = require('./srv/fetchTenants');
// Schedule job to be run on the server.
cron.schedule('*/2 * * * *', () => {
    fetchTenants();
    console.log('running a job every 2 minute');
  });
 
  

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});