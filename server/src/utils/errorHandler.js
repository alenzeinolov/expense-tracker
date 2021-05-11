import APIError from "./APIError";

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({
    status: "error",
    message: err.message,
  });
};

export default errorHandler;
