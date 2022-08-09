const express = require('express');
const { createJob, getJob } = require('../srv/jobController');

const jobSchedulerRouter = () => {
  const router = express.Router();
  router.route('/job').post(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    try {
      const newJob = await createJob(req, logger);
      res.send(newJob);
    } catch (err) {
      logger.error(err);
      res.status(500).send(err);
    }
  });
  router.route('/job').get(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    const data = await getJob(req, logger);
    res.send(data);
  });
  return router;
};

module.exports = jobSchedulerRouter;
