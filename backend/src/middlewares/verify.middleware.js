import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    // get token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized. Token not found",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    // attach decoded payload to req
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};