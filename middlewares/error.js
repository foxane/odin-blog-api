export const errorMiddleware = (err, req, res, next) => {
  console.error('Error handled by app middleware: ', err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res
    .status(500)
    .json({ message: "Something went wrong, i swear i'ts not the server" });
};

export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name; // This sets the error name to the class name (optional but useful)
  }
}

export class InternalServerError extends CustomError {
  constructor() {
    super(500, 'Internal server error');
  }
}

export class Unauthorized extends CustomError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class Forbidden extends CustomError {
  constructor() {
    super(403, 'User is not authorized to do that');
  }
}

export class NotFound extends CustomError {
  constructor() {
    super(404, 'Resource not found');
  }
}
