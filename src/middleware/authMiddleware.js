const jwt = require('jsonwebtoken');
const { User } = require('../sequelize');

exports.protect = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next({
            message: "You need to be logged in to visit this route",
            statusCode: 401,
        });
    }

    const token = req.headers.authorization.replace("Bearer", "").trim();

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            attributes: [
                "id",
                "username",
                "email",
            ],
            where: {
                id: decoded.id,
            }
        });

        req.user = user;
        next();
    } catch (error) {
        next({
            message: "You need to be logged in to visit this route",
            statusCode: 401,
        });
    }
};