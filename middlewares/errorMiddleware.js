import { errorResponse } from '../utils/response.js';

export const errorMiddleware = (err, req, res, next) => {
  console.log('App level error handler ', err);

  errorResponse(res, {
    statusCode: 500,
    message: 'Internal server error',
  });
};

export const notFoundMiddleware = (req, res, next) => {
  console.log('Client trying to access ', req.originalUrl);

  errorResponse(res, {
    statusCode: 404,
    message: 'Resource not found',
  });
};
