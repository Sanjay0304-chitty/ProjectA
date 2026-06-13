import { body } from 'express-validator';

export const registerBody = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('full_name').optional().isString(),
  body('phone').optional().isString(),
];

export const loginBody = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

export const refreshBody = [
  body('refreshToken').notEmpty().withMessage('Refresh token required'),
];
