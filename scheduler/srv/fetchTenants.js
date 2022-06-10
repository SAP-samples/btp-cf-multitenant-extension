
const axios = require("axios");
const sql = require('../util/sql');
const jwt = require('../util/jwt');
const { v4: uuidv4 } = require('uuid');
const fetchTenants = async () => {
 const query = `SELECT * FROM "EF.tenant"`;
 const result = await sql(query);
 if(typeof result === 'object'){
    result.forEach(async (element) =>{
        const token = await jwt(`https://${element.SUBACCOUNTID}`);
        fetchData(token.accessToken, element.SUBACCOUNTID, element.TENANTID);
    });
 }
};
/**
 * Method to fetch data from S/4HANA usign bsuiness partner service.
 * @param {string} accessToken 
 * @param {string} subdomain 
 * @param {string} tenantid 
 */
const fetchData = async (accessToken, subdomain, tenantid) => {
   let temp = process.env.NODE_ENV=='dev' ? 'https://referenceapps-ga-saas2-dev-business-partner.cfapps.eu12.hana.ondemand.com': process.env.businessPartnerAPI;
    try{
        let options1 = {
            method: 'GET',
            url: `${temp}/api/v1/new/bp`,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        };
        const jobId = uuidv4();
        const response = await axios(options1);
        console.info(`🟢 ✅ Job Finished successfully:- ${response.status}, subaccount: ${subdomain}`);
        const query = `INSERT INTO "EF.jobs" VALUES('${jobId}', '${tenantid}','SUCCESS','${new Date().toISOString()}')`;
        const result = await sql(query);
        console.info(result);
    }catch(e){
        // write error message to db for the job
        const jobId = uuidv4();
        console.error(e);
        console.error(`🔴 ❌ Job Failed:- ${e.messaage}, subaccount: ${subdomain}`);
        const query = `INSERT INTO "EF.jobs" VALUES('${jobId}', '${tenantid}','ERROR','${new Date().toISOString()}')`;
        const result = await sql(query);
        console.info(result);
    }
};

module.exports = fetchTenants