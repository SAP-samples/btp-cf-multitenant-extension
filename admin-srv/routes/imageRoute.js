const express = require('express');

const { uploadImage, updateImage, getImage } = require('../srv/imageController');

const imageRouter = () => {
  const router = express.Router();
  router.route('/image').post(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    uploadImage(req, logger).then((result) => {
      logger.info(result);
      res.status(201).send('image uploaded successfully');
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  router.route('/image').put(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    updateImage(req, logger).then((result) => {
      logger.info(result);
      res.status(200).send('image updated successfully');
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  router.route('/image').get(async (req, res) => {
    const logger = req.loggingContext.getLogger('/Application/Network');
    getImage(req, logger).then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      logger.error(err);
      res.status(500).send(err.message);
    });
  });
  return router;
};

module.exports = imageRouter;
