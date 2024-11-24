import prisma from '../prisma/prismaClient.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();

    successResponse(res, {
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory = (req, res, next) => {
  try {
    successResponse(res, {
      data: { category: req.category },
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    if (req.user.authValue < 2)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Forbidden',
      });

    const { name } = req.body;
    await prisma.category.create({ data: { name } });

    successResponse(res, {
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    if (req.user.authValue < 2)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Forbidden',
      });

    const { name } = req.body;
    await prisma.category.update({
      where: { id: req.params.categoryId },
      data: { name },
    });

    successResponse(res, {
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    if (req.user.authValue < 2)
      return errorResponse(res, {
        statusCode: 403,
        message: 'Forbidden',
      });

    await prisma.category.delete({ where: { id: req.params.categoryId } });

    successResponse(res, {
      statusCode: 204,
    });
  } catch (error) {
    next(error);
  }
};
