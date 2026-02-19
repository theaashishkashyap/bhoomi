import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
try {
  await prisma.$connect();
  console.log('SUCCESS');
} catch (e) {
  console.error(e);
} finally {
  await prisma.$disconnect();
}
