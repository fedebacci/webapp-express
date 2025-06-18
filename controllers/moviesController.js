const connection = require('../db/connection');



const index = (req, res) => {
    const moviesSql = `
        SELECT
            AVG(reviews.vote) AS average_vote,
            movies.*

            FROM \`movies\`

            LEFT JOIN \`reviews\`
            ON \`movies\`.\`id\` = \`reviews\`.\`movie_id\`

            GROUP BY \`movies\`.\`id\`
    `;
    connection.query(moviesSql, (error, results) => {
        if (error) console.debug(error);
        if (error) throw error;

        const movies = results.map(movie => {
            movie.average_vote = parseFloat(movie.average_vote);
            return {
                ...movie,
                image: formatImage(movie.image)
            };
        });
        
        res.json({
            message: "Reading all movies",
            movies,
        });
    });
};



const show = (req, res) => {
    const id = parseInt(req.params.id);
    // console.debug("req.params", req.params);
    // console.debug(`id: ${id}`);
    if (isNaN(id)) return res.status(500).json({ message: `Internal server error regarding id: ${req.params.id}. Id must be a number.` });

    const movieSql = `
        SELECT
            AVG(reviews.vote) AS average_vote,
            movies.*

            FROM \`movies\`

            LEFT JOIN \`reviews\`
            ON \`movies\`.\`id\` = \`reviews\`.\`movie_id\`

            WHERE \`movies\`.\`id\` = ?

            GROUP BY \`movies\`.\`id\`
    `;
    connection.query(movieSql, [id], (error, results) => {
        if (error) console.debug(error);
        if (error) throw error;
        if (!results.length) return res.status(404).json({ message: `Movie ${id} has not been found` });

        const movie = results[0];
        movie.image = formatImage(movie.image);
        
        const movieReviwsSql = `
            SELECT 
                * 

            FROM reviews

            WHERE reviews.movie_id = ?
        `;
        connection.query(movieReviwsSql, [id], (error, results) => {
            if (error) console.debug(error);
            if (error) throw error;

            movie.reviews = results;
            // console.debug(movie);

            res.json({
                message: `Reading movie: ${id}`,
                movie,
            });
        });
    });
};



const create = (req, res) => {
    res
        .status(201)
        .json({
            message: `Create route successfully called`
        });
};



const update = (req, res) => {
    const id = parseInt(req.params.id);

    res
        .json({
            message: `Update route successfully called for post: ${id}`
        });
};



const modify = (req, res) => {
    const id = parseInt(req.params.id);

    res
        .json({
            message: `Modify route successfully called for post: ${id}`
        });
};



const destroy = (req, res) => {
    const id = parseInt(req.params.id);

    res
        .json({
            message: `Destroy route successfully called for post: ${id}`
        });
};



// * 
const { APP_URL, APP_PORT } = process.env;
const host = APP_PORT ? `${APP_URL}:${APP_PORT}` : APP_URL;
const formatImage = (image) => {
    // console.log(image);
    // console.log(host);

    return `${host}/images/movies/${image}`;
};



module.exports = { 
    index,
    show,
    create,
    update,
    modify,
    destroy
};