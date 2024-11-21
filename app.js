import 'dotenv/config';
import express from 'express';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});
