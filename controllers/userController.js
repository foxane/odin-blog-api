import bcrypt from 'bcryptjs';
import prisma from '../prisma/prismaClient.js';
import { successResponse } from '../utils/response.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        createDate: true,
        _count: {
          select: {
            posts: {
              where: { published: true },
            },
            comments: true,
          },
        },
      },
    });

    const result = users.map(val => {
      const { _count, ...user } = val;
      return {
        ...user,
        pageCount: _count.posts,
        commentCount: _count.comments,
      };
    });

    successResponse(res, {
      data: { users: result },
    });
  } catch (error) {
    next(error);
  }
};

export const getPostsByUser = async (req, res, next) => {
  try {
    const userPosts = await prisma.post.findMany({
      where: { userId: req.params.userId, published: true },
    });

    successResponse(res, { data: { userPosts } });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByUser = async (req, res, next) => {
  try {
    const userComments = await prisma.comment.findMany({
      where: { userId: req.params.userId },
    });

    successResponse(res, {
      data: { userComments },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.userId },
      select: {
        id: true,
        fullName: true,
        createDate: true,
        _count: {
          select: {
            posts: {
              where: { published: true },
            },
            comments: true,
          },
        },
      },
    });

    const { _count, ...result } = user; // Remove count property from json
    successResponse(res, {
      data: {
        user: {
          ...result,
          postCount: _count.posts,
          commentCount: _count.comments,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const pwHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.update({
      where: { id: req.params.userId },
      data: {
        fullName,
        email,
        password: pwHash,
      },
    });
    delete user.password;

    successResponse(res, {
      statusCode: 200,
      message: 'User data successfully updated',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({ where: { id: req.params.userId } });
    successResponse(res, {
      statusCode: 204,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const changeRole = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.userId },
      data: { role: req.body.role },
    });
    successResponse(res, {
      statusCode: 200,
      message: `${user.fullName}'s role updated to ${user.role}`,
    });
  } catch (error) {
    next(error);
  }
};
