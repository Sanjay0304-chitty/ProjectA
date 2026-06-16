import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../../middleware/auth';
import * as authService from './service_auth';
import { successResponse } from '../../utils/response';
import { env } from '../../config';
import jwt from 'jsonwebtoken';
import { verifyFirebaseToken } from './firebase_auth';
import { prisma } from '../../db';

export class AuthController {
  register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, error: { message: errors.array()[0].msg } });
    }
    try {
      const { email, password, full_name, phone, role } = req.body;
      const user = await authService.registerUser(email, password, full_name, phone, role);
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
      const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as jwt.JwtPayload;
      await authService.verifyRefreshToken((decoded as any).userId, refreshToken);
      const tokens = authService.generateTokens((decoded as any).userId);
      await authService.saveRefreshToken((decoded as any).userId, tokens.refreshToken);
      res.json(successResponse({ tokens }, 'Token refreshed'));
    } catch (error: any) {
      res.status(401).json({ success: false, error: { message: error.message } });
    }
  };

  getMe = async (req: AuthRequest, res: Response) => {
    try {
      const user = await authService.getCurrentUser(req.user!.id);
      if (!user) {
        res.status(404).json({ success: false, error: { message: 'User not found' } });
        return;
      }
      res.json(successResponse({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        profile_img_url: user.profile_img_url,
        role: user.UserRole[0]?.role.name || 'Tenant',
      }));
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

  /* AUTH-009: Google OAuth login */
  googleLogin = async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body;
      if (!idToken) throw new Error('Firebase ID token required');

      // Verify the Firebase ID token (Google provider)
      const firebaseUid = await verifyFirebaseToken(idToken);

      // Find or create user by firebase_uid
      let user = await prisma.user.findUnique({
        where: { firebase_uid: firebaseUid },
        include: { UserRole: { include: { role: true } } },
      });

      if (!user) {
        // Auto-register new Google user as Tenant
        user = await prisma.user.create({
          data: {
            firebase_uid: firebaseUid,
            email: req.body.email || '',
            full_name: req.body.displayName || '',
            passwordHash: null,
            UserRole: {
              create: {
                role: { connect: { name: 'Tenant' } },
              },
            },
          },
          include: { UserRole: { include: { role: true } } },
        });
      }

      if (!user.is_active) throw new Error('Account is suspended');

      const tokens = authService.generateTokens(user.id);
      await authService.saveRefreshToken(user.id, tokens.refreshToken);

      res.json(successResponse({
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          phone: user.phone,
          profile_img_url: user.profile_img_url,
          role: user.UserRole[0]?.role.name || 'Tenant',
        },
        tokens,
      }));
    } catch (error: any) {
      res.status(400).json({ success: false, error: { message: error.message } });
    }
  };
}
