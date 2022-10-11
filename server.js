const express = require("express");
const moment = require('moment')
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const path = require('path');
const app = express();

app.locals.moment = moment;
// 设置模板路径
app.set('views', path.join(__dirname, './app/views'));
// 设置模板引擎
app.set('view engine', 'html');
// 使express兼容art-template模板引擎
app.engine('html', require('express-art-template'));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

require(path.join(__dirname, "./app/routes/logger.routes.js"))(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
