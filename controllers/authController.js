import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/prismaClient.js';
import { errorResponse, successResponse } from '../utils/response.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return errorResponse(res, {
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, {
        statusCode: 401,
        message: 'Invalid credentials',
      });
    }

    const payload = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    successResponse(res, {
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const pwHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        fullName,
        email,
        password: pwHash,
      },
    });

    successResponse(res, {
      statusCode: 201,
      message: 'User created',
    });
  } catch (error) {
    next(error);
  }
};
