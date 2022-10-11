
const Logger = require("../models/logger.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const logger = new Logger({
    content: req.body.content,
    publisher: req.body.publisher,
    env: req.body.env
  });

  Logger.create(logger, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Logger."
      });
    else res.send(data);
  });
};


exports.findOne = (req, res) => {
  Logger.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Logger with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Logger with id " + req.params.id
        });
      }
    } else {
      // 渲染页面
      res.render('index.html', Object.assign(data, { content: decodeURIComponent(data.content) }));
    }
  });
};

exports.delete = (req, res) => {
  Logger.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Logger with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Logger with id " + req.params.id
        });
      }
    } else res.send({ message: `Logger was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Logger.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all loggers."
      });
    else res.send({ message: `All Tutorials were deleted successfully!` });
  });
};
