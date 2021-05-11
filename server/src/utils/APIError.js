class APIError extends Error {
  constructor(message, status, statusCode) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
  }
}

export default APIError;
