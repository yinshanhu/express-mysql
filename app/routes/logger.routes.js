module.exports = app => {
  const loggers = require("../controllers/logger.controller.js");

  var router = require("express").Router();

  router.post("/", loggers.create);

  router.get("/:id", loggers.findOne);

  router.delete("/:id", loggers.delete);

  router.delete("/", loggers.deleteAll);

  // webapi 基路由定义：
  app.use('/yoursite/loggers', router);
};
