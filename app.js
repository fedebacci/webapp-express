// # IMPORTS
require('dotenv').config();
const express = require('express');



// # CONFIG
const app = express();
const { APP_URL, APP_PORT } = process.env;
const host = APP_PORT ? `${APP_URL}:${APP_PORT}` : APP_URL;



// # ROUTES
app.get("/", (req, res) => {
    res 
        .json({
            status: "success",
            message: "Index request received",
        });
});



// # LISTEN



app.listen(APP_PORT, () => {
    console.info(`Server listening on: ${host}`);
});