import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import corsConfig from './middlewares/cors.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import {
  errorMiddleware,
  notFoundMiddleware,
} from './middlewares/errorMiddleware.js';

const app = express();
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') return next();

  // Emulate loading
  setTimeout(() => {
    next();
  }, 1000);
});
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);
app.use('/categories', categoryRouter);

app.all('*', notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
