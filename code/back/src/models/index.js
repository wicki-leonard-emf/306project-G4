import { PrismaClient } from '@prisma/client';

// Utiliser un singleton pour PrismaClient en développement
// pour éviter les multiples instances lors du hot reload
const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['warn', 'error']
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
