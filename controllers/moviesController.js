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
        
        res.json({
            message: `Reading movie: ${id}`,
            movie: results[0],
        });
    });
};



module.exports = { 
    index,
    show
};