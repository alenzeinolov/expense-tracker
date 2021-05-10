class APIError extends Error {
  constructor(message, status, statusCode) {
    this.message = message;
    this.status = status;
    this.statusCode = statusCode;
  }
}

export default APIError;
