/* eslint-disable quotes */
const JobSchedulerClient = require('@sap/jobs-client');
const xsenv = require('@sap/xsenv');
const e = require('express');

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
      name: "testtenant",
      description: "cron job that validates sales order requests",
      action: "http://referenceapps-ga-saas2-dev-business-partner.cfapps.eu12.hana.ondemand.com/api/v1/new/bp",
      active: true,
      httpMethod: "GET",
      schedules: [
        {
          cron: "* * * * * */10 0",
          description: "this schedule runs every 10 minutes",
          data: {
            salesOrderId: "1234",
          },
          active: true,
          startTime: {
            date: "2022-08-09 00:00 +0000",
            format: "YYYY-MM-DD HH:mm Z",
          },
        },
      ],
    };
    const scJob = { job: myJob };

    scheduler.createJob(scJob, (error, body) => {
      if (error) {
        logger.error('Error registering new job %s', error);
        throw new Error(error.message);
      }
      return body;
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
    scheduler.fetchAllJobs(data, (err, result) => {
      if (err) {
        return logger.error('Error retrieving jobs: %s', err);
      }
      // Jobs retrieved successfully
      return result;
    });
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

module.exports = {
  createJob,
  getJob,
};
