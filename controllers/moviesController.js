const connection = require('../db/connection');



const index = (req, res) => {
    const moviesSql = `
        SELECT 
            * 
        
        FROM \`movies\`
    `;
    connection.query(moviesSql, (error, results) => {
        if (error) throw error;
        
        res.json({
            message: "Reading all movies",
            movies: results,
        });
    });
};



const show = (req, res) => {
    const id = parseInt(req.params.id);

    const movieSql = `
        SELECT 
            * 
        
        FROM \`movies\`

        WHERE id = ?
    `;
    connection.query(movieSql, [id], (error, results) => {
        if (error) throw error;
        if (!results.length) return res.status(404).json({ message: `Movie ${id} has not been found` });

        const movie = results[0];
        
        const movieReviwsSql = `
            SELECT 
                * 

            FROM reviews

            WHERE reviews.movie_id = 3
        `;
        connection.query(movieReviwsSql, [id], (error, results) => {
            if (error) throw error;

            movie.reviews = results;

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



module.exports = { 
    index,
    show,
    create,
    update,
    modify,
    destroy
};