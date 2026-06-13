import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../../middleware/auth';
import * as authService from './service_auth';
import { successResponse } from '../../utils/response';
import { env } from '../../config';
import jwt from 'jsonwebtoken';

export class AuthController {
  register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
    }
    try {
      const { email, password, full_name, phone } = req.body;
      const user = await authService.registerUser(email, password, full_name, phone);
      const tokens = authService.generateTokens(user.id);
      await authService.saveRefreshToken(user.id, tokens.refreshToken);
      res.status(201).json(successResponse({
        user: { id: user.id, email: user.email, full_name: user.full_name },
        tokens,
      }, 'Registration successful'));
    } catch (error: any) {
      res.status(400).json({ success: false, error: { message: error.message } });
    }
  };

  login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
    }
    try {
      const { email, password } = req.body;
      const user = await authService.loginUser(email, password);
      const tokens = authService.generateTokens(user.id);
      await authService.saveRefreshToken(user.id, tokens.refreshToken);
      res.json(successResponse({
        user: { id: user.id, email: user.email, full_name: user.full_name, role: user.UserRole[0]?.role.name },
        tokens,
      }, 'Login successful'));
    } catch (error: any) {
      res.status(401).json({ success: false, error: { message: error.message } });
    }
  };

  refresh = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
    }
    try {
      const { refreshToken } = req.body;
      jwt.verify(refreshToken, env.JWT_REFRESH_SECRET, (err, decoded: any) => {
        if (err) return res.status(401).json({ success: false, error: { message: 'Invalid refresh token' } });
        authService.verifyRefreshToken(decoded.userId, refreshToken)
          .then(async () => {
            const tokens = authService.generateTokens(decoded.userId);
            await authService.saveRefreshToken(decoded.userId, tokens.refreshToken);
            res.json(successResponse({ tokens }, 'Token refreshed'));
          })
          .catch(() => res.status(401).json({ success: false, error: { message: 'Invalid refresh token' } }));
      });
    } catch (error: any) {
      res.status(401).json({ success: false, error: { message: error.message } });
    }
  };

  getMe = async (req: AuthRequest, res: Response) => {
    try {
      const user = await authService.getCurrentUser(req.user!.id);
      res.json(successResponse(user));
    } catch (error: any) {
      res.status(404).json({ success: false, error: { message: error.message } });
    }
  };

  updateMe = async (req: AuthRequest, res: Response) => {
    try {
      const user = await authService.updateUserProfile(req.user!.id, req.body);
      res.json(successResponse(user, 'Profile updated'));
    } catch (error: any) {
      res.status(400).json({ success: false, error: { message: error.message } });
    }
  };

  logout = async (req: AuthRequest, res: Response) => {
    try {
      await authService.logoutUser(req.user!.id);
      res.json(successResponse(null, 'Logged out successfully'));
    } catch (error: any) {
      res.status(400).json({ success: false, error: { message: error.message } });
    }
  };
}
