import express from 'express';
import { registerBody, loginBody, refreshBody } from './dto';
import { authenticate } from '../../middleware/auth';
import { authLimiter } from '../../middleware/rateLimit';
import { AuthController } from './controller_auth';

const router = express.Router();
const auth = new AuthController();

router.post('/register', authLimiter, registerBody, auth.register);
router.post('/login', authLimiter, loginBody, auth.login);
router.post('/refresh', authLimiter, refreshBody, auth.refresh);
router.post('/logout', authenticate, auth.logout);
router.get('/me', authenticate, auth.getMe);
router.put('/me', authenticate, auth.updateMe);
router.post('/google', auth.googleLogin);

export default router;
