const cred = require("./env");
const vcap = cred.system_env_json.VCAP_SERVICES;
const cis = require('./cis.json');
const appenv = cred.application_env_json.VCAP_APPLICATION;
module.exports.xsuaa = {
  grant_type: "client_credentials",
  client_id: vcap.xsuaa[0].credentials.clientid,
  client_secret: vcap.xsuaa[0].credentials.clientsecret,
};

module.exports.saas = {
  grant_type: "client_credentials",
  client_id: vcap["saas-registry"][0].credentials.clientid,
  client_secret: vcap["saas-registry"][0].credentials.clientsecret,
};
module.exports.cis = {
  grant_type: 'password',
  client_id: cis.uaa.clientid,
  client_secret: cis.uaa.clientsecret,
  username: '<technicaluser>',
  password: '<technicaluserpassword>'
}
