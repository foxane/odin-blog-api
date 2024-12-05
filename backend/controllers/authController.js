import prisma from '../prisma/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createJWT = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const pwHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: pwHash,
      },
    });

    res.status(201).json({
      token: createJWT({
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      }),
      user: {
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      token: createJWT({
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      }),
      user: {
        id: user.id,
        name: user.name,
        authValue: user.authValue,
      },
    });
  } catch (error) {
    next(error);
  }
};
