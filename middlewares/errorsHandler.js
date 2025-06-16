const errorsHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ?? 500;
    const errMessage = err.message ?? "Server error";

    const responseObject = {
        error: errMessage
    };

    if (err.data) {
        responseObject.data = err.data;
    };
    
    console.debug("ERROR HANDLER PARTITO");
    // console.debug("ERROR HANDLER PARTITO: ", responseObject);
    // console.debug("ERROR HANDLER PARTITO: ", err);

    res
        .status(statusCode)
        .json(responseObject);
};


module.exports = { errorsHandler };