async function debug() {
  const bcrypt = require('bcryptjs');
  const { prisma } = require('./src/db');
  const user = await prisma.user.findUnique({ where: { email: 'admin@prms.com' } });
  console.log('User exists:', !!user);
  console.log('Hash:', user?.passwordHash?.substring(0, 40));
  console.log('Password matches:', await bcrypt.compare('Password123', user?.passwordHash || ''));
  await prisma.\$disconnect();
}
debug().catch(console.error);