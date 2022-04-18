"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers = require('./controllers');
const router = express.Router();
router.get('/', controllers.sendDefault);
router.get('/movies', controllers.getAllMovies);
router.get('/moviesPag/:skip', controllers.getSomeMovies);
router.get('/movies/:id', controllers.getMovie);
router.post('/send', controllers.sendFile);
router.post('/combine', controllers.combine);
module.exports = router;
//# sourceMappingURL=router.js.map