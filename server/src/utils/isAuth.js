import APIError from "../utils/APIError";

const authKey = "authorization";
const tokenPrefix = "Bearer ";
const isAuth = (req, _, next) => {
  // if (authKey in req.headers && req.headers[authKey].includes(tokenPrefix)) {
  // const authStr = req.headers[authKey];
  // const token = authStr.split(" ")[1];
  // console.log(token);
  // next();
  // }
  next(new APIError("You are not authenticated.", "fail", 401));
};

export default isAuth;
