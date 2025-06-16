// # IMPORTS
require('dotenv').config();
const express = require('express');
const moviesRouter = require('./routers/moviesRouter');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { notFound } = require('./middlewares/notFound');



// # CONFIG
const app = express();
const { APP_URL, APP_PORT } = process.env;
const host = APP_PORT ? `${APP_URL}:${APP_PORT}` : APP_URL;



// # MIDDLEWARES
app.use(express.static('public'));



// # ROUTES
app.get("/", (req, res) => {
    // - TEST gestione errori: Internal server error
    // console.log(abc);
    
    res 
        .json({
                status: "success",
                message: "Index request received",
            });
});



// # ROUTERS
app.use("/movies", moviesRouter);



// # ERROR HANDLING MIDDLEWARES
app.use(notFound);
app.use(errorsHandler);



// # LISTEN
app.listen(APP_PORT, () => {
    console.info(`Server listening on: ${host}`);
});