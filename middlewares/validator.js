import prisma from '../prisma/prismaClient.js';
import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

// Handler after validation
const handleValidationResult = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return errorResponse(res, {
      statusCode: 400,
      message: 'Input validation failed',
      errorDetails: result.array(),
    });
  }
  next();
};

// Validation chain ingredients
const validationRules = {
  email: body('email')
    .trim()
    .notEmpty()
    .withMessage('Email must not be empty')
    .isEmail()
    .withMessage('Email address must be valid'),

  emailUsed: body('email').custom(async (email, { req }) => {
    const isUsed = await prisma.user.findUnique({ where: { email } });
    if (isUsed && req.user.email !== email) {
      throw new Error('Email is already in use');
    }

    return true;
  }),

  password: body('password')
    .trim()
    .notEmpty()
    .withMessage('Password must not be empty')
    .isLength({ min: 2 })
    .withMessage('Password is too short'),

  fullName: body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name must not be empty')
    .isAlpha()
    .withMessage('Full name can only contain alphabet characters')
    .isLength({ min: 2 })
    .withMessage('Full name is too short'),

  title: body('title')
    .trim()
    .notEmpty()
    .withMessage('Title must not be empty')
    .isLength({ min: 5, max: 30 })
    .withMessage('Title must be between 5 - 30 characters'),

  content: body('content').custom(delta => {
    if (!Array.isArray(delta) || !delta[0].hasOwnProperty('insert')) {
      throw new Error('Not a quill delta');
    }

    return true;
  }),
};

export const signupValidator = [
  validationRules.fullName,
  validationRules.email,
  validationRules.emailUsed,
  validationRules.password,
  handleValidationResult,
];

export const loginValidator = [
  validationRules.email,
  validationRules.password,
  handleValidationResult,
];

export const postValidator = [
  validationRules.title,
  validationRules.content,
  handleValidationResult,
];

export const commentValidator = [
  validationRules.content,
  handleValidationResult,
];
