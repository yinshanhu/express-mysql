const sql = require("./db.js");

// constructor
const Logger = function (logger) {
  this.content = logger.content;
  this.publisher = logger.publisher;
  this.env = logger.env;
};

Logger.create = (newLogger, result) => {
  sql.query("INSERT INTO loggers SET ?", newLogger, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLogger });
  });
};

Logger.findById = (id, result) => {
  sql.query(`SELECT * FROM loggers WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Logger.remove = (id, result) => {
  sql.query("DELETE FROM loggers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Logger with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

Logger.removeAll = result => {
  sql.query("DELETE FROM loggers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

module.exports = Logger;
