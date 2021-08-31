const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api-error');
const jwtSecret = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token)
            return next(ApiError.UnauthorizedError());

        const userData = jwt.verify(token, jwtSecret);

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};