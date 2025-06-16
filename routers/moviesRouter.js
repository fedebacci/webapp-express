const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/moviesController.js');



moviesRouter.get('/', moviesController.index);
moviesRouter.get('/:id', moviesController.show);
moviesRouter.post('/', moviesController.create);
moviesRouter.put('/:id', moviesController.update);
moviesRouter.patch('/:id', moviesController.modify);
moviesRouter.delete('/:id', moviesController.destroy);



module.exports = moviesRouter;