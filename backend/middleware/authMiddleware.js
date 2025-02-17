import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, resizeBy, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Not Authorized, token failed");
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, token failed");
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not Authorized as an admin");
    }
};

export { protect, admin };
