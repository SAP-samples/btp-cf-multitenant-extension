const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();

const core = require('@sap-cloud-sdk/core');

const axios = require('axios');
const qs = require('qs');

async function getSubscriptions(registry) {
  try {
    // get access token
    const options = {
      method: 'POST',
      url: `${registry.url}/oauth/token?grant_type=client_credentials&response_type=token`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${registry.clientid}:${registry.clientsecret}`).toString('base64')}`,
      },
    };
    const res = await axios(options);
    try {
      // get subscriptions
      const options1 = {
        method: 'GET',
        url: `${registry.saas_registry_url}/saas-manager/v1/application/subscriptions`,
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      };
      const res1 = await axios(options1);
      return res1.data;
    } catch (err) {
      console.log(err.stack);
      return err.message;
    }
  } catch (err) {
    console.log(err.stack);
    return err.message;
  }
}

async function getCFInfo(appname) {
  try {
    // get app GUID
    const res1 = await core.executeHttpRequest({ destinationName: 'app-cfapi' }, {
      method: 'GET',
      url: `/v3/apps?organization_guids=${appEnv.app.organization_id}&space_guids=${appEnv.app.space_id}&names=${appname}`,
    });
      // get domain GUID
    const res2 = await core.executeHttpRequest({ destinationName: 'app-cfapi' }, {
      method: 'GET',
      url: `/v3/domains?names=${/\.(.*)/gm.exec(appEnv.app.application_uris[0])[1]}`,
    });
    const results = {
      app_id: res1.data.resources[0].guid,
      domain_id: res2.data.resources[0].guid,
    };
    return results;
  } catch (err) {
    console.log(err.stack);
    return err.message;
  }
}

async function createRoute(tenantHost, appname) {
  getCFInfo(appname).then(
    async (CFInfo) => {
      try {
        // create route
        const res1 = await core.executeHttpRequest({ destinationName: 'app-cfapi' }, {
          method: 'POST',
          url: '/v3/routes',
          data: {
            host: tenantHost,
            relationships: {
              space: {
                data: {
                  guid: appEnv.app.space_id,
                },
              },
              domain: {
                data: {
                  guid: CFInfo.domain_id,
                },
              },
            },
          },
        });
        // map route to app
        const res2 = await core.executeHttpRequest({ destinationName: 'app-cfapi' }, {
          method: 'POST',
          url: `/v3/routes/${res1.data.guid}/destinations`,
          data: {
            destinations: [{
              app: {
                guid: CFInfo.app_id,
              },
            }],
          },
        });
        console.log(`Route created for ${tenantHost}`);
        return res2.data;
      } catch (err) {
        console.log(err.stack);
        return err.message;
      }
    },
    (err) => {
      console.log(err.stack);
      return err.message;
    },
  );
}

async function deleteRoute(tenantHost, appname) {
  getCFInfo(appname).then(
    async (CFInfo) => {
      try {
        // get route id
        const res1 = await core.executeHttpRequest({ destinationName: 'app2-cfapi' }, {
          method: 'GET',
          url: `/v3/apps/${CFInfo.app_id}/routes?hosts=${tenantHost}`,
        });
        if (res1.data.pagination.total_results === 1) {
          try {
            // delete route
            const res2 = await core.executeHttpRequest({ destinationName: 'app2-cfapi' }, {
              method: 'DELETE',
              url: `/v3/routes/${res1.data.resources[0].guid}`,
            });
            console.log(`Route deleted for ${tenantHost}`);
            return res2.data;
          } catch (err) {
            console.log(err.stack);
            return err.message;
          }
        } else {
          const errmsg = { error: 'Route not found' };
          console.log(errmsg);
          return errmsg;
        }
      } catch (err) {
        console.log(err.stack);
        return err.message;
      }
    },
    (err) => {
      console.log(err.stack);
      return err.message;
    },
  );
}
module.exports = {
  getSubscriptions,
  createRoute,
  deleteRoute,
};
