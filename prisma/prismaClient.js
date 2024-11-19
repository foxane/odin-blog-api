import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); // Singleton prisma client, shared to entire project
export default prisma;
