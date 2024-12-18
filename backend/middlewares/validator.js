import prisma from '../prisma/prismaClient.js';
import { body, validationResult } from 'express-validator';

const handleError = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.errors.map(err => err.msg);
    return res
      .status(400)
      .json({ message: 'Validation failed', errorDetails: errors });
  }

  next();
};

const rules = {
  name: body('name')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Name can only contains alphabet'),
  email: body('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Not valid email'),

  emailInUse: body('email').custom(async email => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      throw new Error('Email is already in use');
    }

    return true;
  }),

  password: body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 2 })
    .withMessage('Password need to be at least 2 character'),
  title: body('title')
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Title need to be at least 10 characters long'),
  content: body('content')
    .trim()
    .notEmpty()
    .withMessage('Content cannot be empty')
    .isLength({ min: 100 })
    .withMessage('Content need to be at least 100 characters long'),

  comment: body('content')
    .trim()
    .notEmpty()
    .withMessage('Comment cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Comment need to be at least 5 characters long'),

  category: body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name cannot be empty')
    .isLength({ min: 2 })
    .withMessage('Category name need to be at least 2 characters long'),

  categories: body('categories').custom(cats => {
    if (typeof cats !== 'object' || !Array.isArray(cats)) {
      throw new Error('Category needs to be an array, even if its empty');
    }

    cats.forEach(cat => {
      if (typeof cat !== 'string' || cat.length < 2)
        throw new Error(
          'Category name should be string and at least 2 character',
        );
    });

    return true;
  }),
};

export const regValidation = [
  rules.name,
  rules.email,
  rules.emailInUse,
  rules.password,
  handleError,
];

export const postValidation = [
  rules.title,
  rules.content,
  rules.categories,
  handleError,
];
export const commentValidation = [rules.comment, handleError];
export const loginValidation = [rules.email, rules.password, handleError];
export const categoryValidation = [rules.category, handleError];
