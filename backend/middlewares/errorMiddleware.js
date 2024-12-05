export const errorMiddleware = (err, req, res, next) => {
  console.log('App level error handler ', err);

  res.status(500).json({ message: "I don't like you" });
};

export const notFoundMiddleware = (req, res, next) => {
  res.status(404).json('Resource not found');
};
