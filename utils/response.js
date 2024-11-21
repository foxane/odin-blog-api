/**
 * Send a success response
 * @param {Response} res - Response object passed from express middleware
 * @param {Object} response - Contains response data
 * @param {Number} [response.statusCode=200] - Status code (default 200)
 * @param {String} [response.message='Request successful'] - Response message
 * @param {Object} [response.data=null] - Data to send
 */

export function successResponse(
  res,
  { statusCode = 200, message = 'Request successful', data = null },
) {
  const response = { success: true, message };

  if (data !== null) response.data = data;

  res.status(statusCode).json(response);
}

/**
 * Send an error response
 * @param {Response} res - Response object passed from express middleware
 * @param {Object} response - Contains response data
 * @param {Number} response.statusCode - Status code for error
 * @param {String} [response.message='An error occurred'] - Error message to return
 * @param {any} [response.errorDetails=null] - Additional error details
 */

export function errorResponse(
  res,
  { statusCode, message = 'An error occurred', errorDetails = null },
) {
  const response = { success: false, message, errorCode: statusCode };

  if (errorDetails !== null) response.errorDetails = errorDetails;

  res.status(statusCode).json(response);
}
