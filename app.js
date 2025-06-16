// # IMPORTS
require('dotenv').config();
const express = require('express');
const moviesRouter = require('./routers/moviesRouter');
// - TEST
const connection = require('./db/connection');



// # CONFIG
const app = express();
const { APP_URL, APP_PORT } = process.env;
const host = APP_PORT ? `${APP_URL}:${APP_PORT}` : APP_URL;



// # ROUTES
app.get("/", (req, res) => {
    // - TEST
    // console.log(abc);
    const moviesSql = "SELECT * FROM `movies`";
    connection.query(moviesSql, (error, results) => {
        if (error) throw error;
        
        res.json({
            message: "All movies received",
            movies: results,
        });
    });
    
    // res 
    //     .json({
        //         status: "success",
        //         message: "Index request received",
        //     });
});



// # ROUTERS
app.use("/movies", moviesRouter);



// # LISTEN
app.listen(APP_PORT, () => {
    console.info(`Server listening on: ${host}`);
});