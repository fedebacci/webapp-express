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
        if (error) return res.status(500).json({ message: `Internal server error`, error });

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
        if (error) return res.status(500).json({ message: `Internal server error`, error });
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
            if (error) return res.status(500).json({ message: `Internal server error`, err });

            movie.reviews = results;
            // console.debug(movie);

            res.json({
                message: `Reading movie: ${id}`,
                movie,
            });
        });
    });
};



const storeReview = (req, res) => {
    console.log("storeReview req.params", req.params);
    console.log("storeReview req.body", req.body);

    const { id: movie_id } = req.params;
    const { name, vote, text } = req.body;


    
    const validationErrors = [];

    if (!vote || vote < 1 || vote > 5) {
        validationErrors.push({
            field_name: "vote",
            message: "Vote must be a number between 1 and 5"
        });
    };
    if (!name || !name.length) {
        validationErrors.push({
            field_name: "name",
            message: "Name cannot be empty"
        });
    };
    if (!text || !text.length) {
        validationErrors.push({
            field_name: "text",
            message: "Text cannot be empty"
        });
    };

    if (validationErrors.length) {
        return res
            // *STATUS: BAD REQUEST
            .status(403)
            .json({
                message: "Invalid payload",
                data: validationErrors
            });
    };



    const storeReviewSql = `
        INSERT INTO \`reviews\`

        (movie_id, name, vote, text) VALUES
        (?, ?, ?, ?);
    `;

    connection.query(storeReviewSql, [movie_id, name, vote, text], (error, results) => {
        if (error) console.debug(error);
        if (error) return res.status(500).json({ message: `Internal server error`, error });

        // console.debug(results);

        res
            .status(201)
            .json({
                message: `storeReview route successfully called for movie: ${movie_id}. New review is: #${results.insertId}`,
                newReview: {
                    id: results.insertId,
                    movie_id,
                    name, 
                    vote, 
                    text
                }
            });
    });
};












const create = (req, res) => {

    const { title, director, genre, release_year, abstract } = req.body;
    const { filename } = req.file;



    const validationErrors = [];

    if (!title || !title.length) {
        validationErrors.push({
            field_name: "title",
            message: "Title cannot be empty"
        });
    };
    if (!director || !director.length) {
        validationErrors.push({
            field_name: "director",
            message: "Director cannot be empty"
        });
    };
    if (!genre || !genre.length) {
        validationErrors.push({
            field_name: "genre",
            message: "Genre cannot be empty"
        });
    };
    if (!release_year || release_year < 1895 || release_year > new Date().getFullYear()) {
        validationErrors.push({
            field_name: "release_year",
            message: "Release year must be a number between 1985 (cinema's invention) and today."
        });
    };
    if (!abstract || !abstract.length) {
        validationErrors.push({
            field_name: "abstract",
            message: "Abstract cannot be empty"
        });
    };
    // todo: decidere se dare errore o utilizzare placeholder di default
    if (!filename || !filename.length) {
        validationErrors.push({
            field_name: "filename",
            message: "Image cannot be empty"
        });
    };

    if (validationErrors.length) {
        return res
            // *STATUS: BAD REQUEST
            .status(403)
            .json({
                message: "Invalid payload",
                data: validationErrors
            });
    };



    
    const createMovieSql = `
        INSERT INTO \`movies\`

        (title, director, genre, release_year, abstract, image) VALUES
        (?, ?, ?, ?, ?, ?);
    `;

    connection.query(createMovieSql, [title, director, genre, release_year, abstract, filename], (error, results) => {
        if (error) console.debug(error);
        if (error) return res.status(500).json({ message: `Internal server error`, error });

        // console.debug(results);

        // todo: capire se possibile restituire da qui il newMovie per la navigazione diretta alla pagina del nuovo film creato oppure se lasciar fare la richiesta a showmovie come adesso
        res
            .status(201)
            .json({
                message: `Create route successfully called`,
                newMovie_id: results.insertId
            });
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

    // # TMP!
    // * gestisco salvataggio di indirizzi internet come immagini, es: 
    // * https://geogold.hu/wp-content/uploads/2023/10/Vertical-Placeholder-Image.jpg
    // const debugImgUrl = "https://geogold.hu/wp-content/uploads/2023/10/Vertical-Placeholder-Image.jpg";
    // console.debug(`debugImgUrl: ${debugImgUrl}`);
    // console.debug(`debugImgUrl.slice(0,8): ${debugImgUrl.slice(0,8)}`);
    // console.debug(`image: ${image}`);
    if (image?.slice(0,8) === 'https://') return image;

    return image ? `${host}/images/movies/${image}` : `${host}/images/movies/placeholder.jpg`;
};



module.exports = { 
    index,
    show,
    storeReview,

    create,
    update,
    modify,
    destroy
};