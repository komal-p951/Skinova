import User from "../model/user.js";
import  httpStatus from "http-status";
import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "token not provided!" });
    }
    const decode = jwt.verify(token, process.env.SECRET);
    const admin = await User.findOne({
      _id:decode.id,
      token:token
    });
    if (!admin) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "Access denied!" });
    }

    if (admin.role !== "author") {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Access denied! Not an admin" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(httpStatus.UNAUTHORIZED).json({ code: "TOKEN_EXPIRED", message: "Your session has expired. Please log in again." });
    }
    return res.status(httpStatus.UNAUTHORIZED).json({ code: "TOKEN_INVALID", message: "Invalid token" });
  }
};
