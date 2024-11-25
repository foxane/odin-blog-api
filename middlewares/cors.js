const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS.split(',');
export default {
  origin: (origin, cb) => {
    console.log(origin);
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by cors'));
    }
  },
};
