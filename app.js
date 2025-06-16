// # IMPORTS
require('dotenv').config();
const express = require('express');
const moviesRouter = require('./routers/moviesRouter');



// # CONFIG
const app = express();
const { APP_URL, APP_PORT } = process.env;
const host = APP_PORT ? `${APP_URL}:${APP_PORT}` : APP_URL;



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



// # LISTEN
app.listen(APP_PORT, () => {
    console.info(`Server listening on: ${host}`);
});