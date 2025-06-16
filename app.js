// # IMPORTS
require('dotenv').config();
const express = require('express');
// - TEST
const connection = require('./db/connection');



// # CONFIG
const app = express();
const { APP_URL, APP_PORT } = process.env;
const host = APP_PORT ? `${APP_URL}:${APP_PORT}` : APP_URL;



// # ROUTES
app.get("/", (req, res) => {
    // - TEST
    const moviesSql = "SELECT * FROM `movies`";
    connection.query(moviesSql, (error, results) => {
        if (error) return res.status(500).json({ message: "Internal server error in /movies/"});

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



// # LISTEN



app.listen(APP_PORT, () => {
    console.info(`Server listening on: ${host}`);
});