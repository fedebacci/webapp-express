const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/moviesController.js');



moviesRouter.get('/', moviesController.index);
moviesRouter.get('/:id', moviesController.show);



module.exports = moviesRouter;