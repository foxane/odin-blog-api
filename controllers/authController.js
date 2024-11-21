import prisma from '../prisma/prismaClient.js';
import { successResponse, errorResponse } from '../utils/response.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const createJWT = payload =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const pwHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: pwHash,
    },
  });

  successResponse(res, {
    statusCode: 201,
    message: 'Account created',
    data: {
      token: createJWT({ id: user.id, name: user.name }),
    },
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return errorResponse(res, {
      statusCode: 401,
      message: 'Invalid credentials',
    });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return errorResponse(res, {
      statusCode: 401,
      message: 'Invalid credentials',
    });

  successResponse(res, {
    statusCode: 200,
    data: {
      token: createJWT({ id: user.id, name: user.name }),
    },
  });
};
