// backend/utils/jwtToken.js
import jwt from "jsonwebtoken";

/**
 * createToken(userId) -> token string
 */
export const createToken = (userId) => {
  const secret = process.env.JWT_SECRET_KEY || "change_this_secret";
  const expiresIn = process.env.JWT_EXPIRE || "7d";
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

/**
 * sendToken(user, statusCode, res, message)
 * - signs a token, removes password from returned user object and sends JSON response
 * - message is optional
 */
export const sendToken = (user, statusCode, res, message = null) => {
  const token = createToken(user._id ? user._id : user.id);

  // Remove password from user object before sending
  const userSafe = user._doc ? { ...user._doc } : { ...user };
  if (userSafe.password) delete userSafe.password;

  const payload = {
    success: true,
    token,
    user: userSafe,
  };
  if (message) payload.message = message;

  return res.status(statusCode).json(payload);
};

/**
 * sendCookieToken(user, statusCode, res, message)
 * - optional helper to set token in httpOnly cookie and respond
 */
export const sendCookieToken = (user, statusCode, res, message = null) => {
  const token = createToken(user._id ? user._id : user.id);

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + (parseInt(process.env.COOKIE_EXPIRE || "7", 10) * 24 * 60 * 60 * 1000)),
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  const userSafe = user._doc ? { ...user._doc } : { ...user };
  if (userSafe.password) delete userSafe.password;

  const payload = {
    success: true,
    token,
    user: userSafe,
  };
  if (message) payload.message = message;

  return res.status(statusCode).cookie("token", token, cookieOptions).json(payload);
};
