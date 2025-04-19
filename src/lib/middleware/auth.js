import { errorResponse } from "../helpers.js";

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json(errorResponse("Authentication required", 401));
    }

    next();
};

export { authenticate };
