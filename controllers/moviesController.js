const index =  (req, res) => {
    res.json({
        message: "Reading all movies"
    });
};



const show =  (req, res) => {
    const { id } = req.params;

    res.json({
        message: `Reading movie: ${id}`
    });
};



module.exports = { 
    index,
    show
};