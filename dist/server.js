"use strict";
const server = require('./app');
require('dotenv').config();
const port = process.env.PORT;
const url = process.env.DB_HOST;
const mongoose = require('mongoose');
const db = mongoose.connection;
const uri = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected with DB');
});
server.listen(port, () => console.log(`server running on port ${port}`));
//# sourceMappingURL=server.js.map