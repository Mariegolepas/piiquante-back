const jwt = require('jsonwebtoken');

/**
 * Our middleware to auth every action from users by the token given while account created
 * @param {string} req 
 * @param {string} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        const userId = decodedToken.userId;
        req.auth = {
            userId:  userId
        };
        next();
    } catch(error) {
        res.status(401).json({error});
    }
}