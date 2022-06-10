const oAuthClient = require('client-oauth2');
const xsenv = require('@sap/xsenv');
const services = xsenv.getServices({
    uaa: { tag: 'xsuaa' },
  });

 /**
  * 
  * @param {string} subdomain 
  * @return string
  */ 
const fetchAccessToken = async (subdomain) => {
    return new Promise(async (resolve, reject)=>{
        try{
            const url = subdomain + services.uaa.url.slice(services.uaa.url.split(".")[0].length, services.uaa.url.length);
            console.log(url);
            const options = {
                accessTokenUri: url + '/oauth/token',
                clientId: services.uaa.clientid,
                clientSecret: services.uaa.clientsecret,
                scopes: []
            };
            const client = new oAuthClient(options);
            try{
                const result = await client.credentials.getToken();
                resolve(result);
            }catch(e){
                console.error(e);
                reject(e);
            }
           
        } catch(err){
            console.error(err);
            reject(err)
        }
     
    });
};
module.exports = fetchAccessToken;