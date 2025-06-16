const connection = require('../db/connection');



const index =  (req, res) => {
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



const show =  (req, res) => {
    const { id } = req.params;

    const movieSql = `
        SELECT 
            * 
        
        FROM \`movies\`

        WHERE id = ?
    `;
    connection.query(movieSql, [id], (error, results) => {
        if (error) throw error;

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
            console.debug(movie);

            res.json({
                message: `Reading movie: ${id}`,
                movie,
            });
        });
    });
};



module.exports = { 
    index,
    show
};