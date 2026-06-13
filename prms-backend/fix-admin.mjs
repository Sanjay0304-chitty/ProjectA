import bcrypt from 'bcryptjs';
import { prisma } from './src/db.js';
const hash = await bcrypt.hash('Password123', 10);
const result = await prisma.user.update({ where: { email: 'admin@prms.com' }, data: { passwordHash: hash } });
console.log('Updated admin password. Hash:', hash);
await prisma.$disconnect();