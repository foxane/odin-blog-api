import 'dotenv/config';
import express from 'express';

// Routes
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users?', userRouter);
app.use('/posts?', postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listen on port ', PORT);
});
