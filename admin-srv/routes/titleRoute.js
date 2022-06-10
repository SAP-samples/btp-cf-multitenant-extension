const express = require('express');

const { createTitle, getTitle } = require('../srv/titleController');

const imageRouter = () => {
  const router = express.Router();
  router.route('/title').put(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    createTitle(req, logger).then((result) => {
      res.status(200).send('Title Updated');
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  router.route('/title').get(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    getTitle(req, logger).then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  return router;
};

module.exports = imageRouter;
