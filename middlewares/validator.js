import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

const handleError = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    errorResponse(res, {
      statusCode: 400,
      message: 'Validation failed',
      errorDetails: result.array(),
    });
  }

  next();
};

const rules = {
  name: body('name')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isAlpha()
    .withMessage('Name can only contains alphabet'),
  email: body('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Not valid email'),
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
    .withMessage('Title cannot be empty')
    .isLength({ min: 10 })
    .withMessage('Comment need to be at least 100 characters long'),
};

export const regValidation = [
  rules.name,
  rules.email,
  rules.password,
  handleError,
];

export const postValidation = [rules.title, rules.content, handleError];
export const loginValidation = [rules.email, rules.password, handleError];
