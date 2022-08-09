const oAuthClient = require('client-oauth2');
/**
  *
  * @param {string} subdomain
  * @return string
  */
const fetchAccessToken = async (url, creds) => new Promise(async (resolve, reject) => {
  try {
    const options = {
      accessTokenUri: `${url}/oauth/token`,
      clientId: creds.uaa.clientid,
      clientSecret: creds.uaa.clientsecret,
      scopes: [],
    };
    const client = new oAuthClient(options);
    try {
      const result = await client.credentials.getToken();
      resolve(result);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  } catch (err) {
    console.error(err);
    reject(err);
  }
});
module.exports = fetchAccessToken;
