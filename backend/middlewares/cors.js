export default {
  origin: (origin, cb) => {
    if (!origin || process.env.ALLOWED_ORIGINS.split(',').includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by cors'));
    }
  },
};
