"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require('./controllers');
// const middlewares = require('./middlewares');
const router = express.Router();
// router.post('/login', middlewares.login, middlewares.isNotFull, controllers.login);
// router.post('/sendAnswers', middlewares.validToken, controllers.sendAnswers);
// router.post('/crear', controllers.postMuchos); //use it from Postman.
// router.get('/getResults/:search', controllers.getResults);
// router.get('/download/:id',middlewares.fileExist, controllers.sendFile)
router.get('/', controllers.sendDefault);
router.get('/movies', controllers.getAllMovies);
router.get('/moviesPag/:skip', controllers.getSomeMovies);
router.get('/movies/:id', controllers.getMovie);
router.post('/send', controllers.sendFile);
router.post('/combine', controllers.combine);
module.exports = router;
//# sourceMappingURL=router.js.map