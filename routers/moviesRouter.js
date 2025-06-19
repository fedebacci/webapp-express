const express = require('express');
const moviesRouter = express.Router();
const moviesController = require('../controllers/moviesController.js');



// # Rotte già gestite
moviesRouter.get('/', moviesController.index);
moviesRouter.get('/:id', moviesController.show);

// * CREAZIONE RECENSIONE
moviesRouter.post('/:id/reviews', moviesController.storeReview);



// # Rotte attualmente da gestire
moviesRouter.post('/', moviesController.create);
moviesRouter.put('/:id', moviesController.update);
moviesRouter.patch('/:id', moviesController.modify);
moviesRouter.delete('/:id', moviesController.destroy);



module.exports = moviesRouter;