module.exports = (request, response) => {
    return response.status(404).send({
        status: 404,
        message: '404 not found'
    });
};
