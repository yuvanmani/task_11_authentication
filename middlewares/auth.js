const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = {
    isAuthenticated: (req, res, next) => {
        try {
            // get the token from the request headers
            const token = req.headers["authorization"].split(" ")[1];

            // verify the token 
            const decoded = jwt.verify(token, JWT_SECRET);

            // get the userId to search for data in the database
            req.userId = decoded.id;

            next();

        }
        catch (error) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
    }
}

module.exports = auth;