/* eslint-disable quotes */
const JobSchedulerClient = require('@sap/jobs-client');
const xsenv = require('@sap/xsenv');

const jobSchedulerCreds = xsenv.serviceCredentials({ tag: 'jobscheduler' });
const jwt = require('../utility/jwt');

const createJob = async (req, logger) => {
  try {
    const subdomain = req.authInfo.getSubdomain();
    const domain = `https://${subdomain}.${jobSchedulerCreds.uaa.uaadomain}`;
    const token = await jwt(domain, jobSchedulerCreds);
    const options = {
      baseURL: `${jobSchedulerCreds.url}`,
      token: token.accessToken,
    };
    const scheduler = new JobSchedulerClient.Scheduler(options);
    const myJob = {
      name: `${subdomain.split("-")[0] + new Date().getMilliseconds()}`,
      description: "cron job that calls HTTP endpoint",
      action: `${process.env.businessPartnerAPI}/api/v1/new/bp`,
      active: true,
      httpMethod: "GET",
      schedules: [
        {
          cron: `* * * * * */${req.query.time} 0`,
          description: `this schedule runs every ${req.query.time} minutes to fetch the tenant data and find new businesspartners`,
          active: true,
          startTime: {
            date: `${new Date().toISOString().split('T')[0]} 00:00 +0000`,
            format: "YYYY-MM-DD HH:mm Z",
          },
        },
      ],
    };
    const scJob = { job: myJob };

    return new Promise((resolve, reject) => {
      scheduler.createJob(scJob, (error, body) => {
        if (error) {
          logger.error('Error registering new job %s', error);
          return reject(error);
        }
        return resolve(body);
      });
    });
  } catch (schedulererr) {
    logger.error(schedulererr);
    throw new Error("Error While creating the job");
  }
};
const getJob = async (req, logger) => {
  try {
    const subdomain = req.authInfo.getSubdomain();
    const domain = `https://${subdomain}.${jobSchedulerCreds.uaa.uaadomain}`;
    const token = await jwt(domain, jobSchedulerCreds);
    const options = {
      baseURL: `${jobSchedulerCreds.url}`,
      token: token.accessToken,
    };
    const scheduler = new JobSchedulerClient.Scheduler(options);
    const data = {};
    return new Promise((resolve, reject) => {
      scheduler.fetchAllJobs(data, (err, result) => {
        if (err) {
           logger.error('Error retrieving jobs: %s', err);
          return reject(err);
        }
        // Jobs retrieved successfully
        logger.info(result)
        return resolve(result);
      });
    });
    
  } catch (errr) {
    logger.error(errr);
    throw errr;
  }
};

module.exports = {
  createJob,
  getJob,
};
