"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./router');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
// enable files upload
app.use(fileUpload({ createParentPath: true }));
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', routes);
module.exports = app;
//# sourceMappingURL=app.js.map