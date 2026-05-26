import  httpStatus from "http-status";
import jwt from "jsonwebtoken";
import User from "../model/user.js";


export const isLogginUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Token not provided!" });
    }
    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decoded.id);

    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
};
