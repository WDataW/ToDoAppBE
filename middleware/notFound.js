const { StatusCodes } = require('http-status-codes');
const notFound = async (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
        err: {
            msg: 'Resource Not Found'
        }
    });
}
module.exports = notFound;