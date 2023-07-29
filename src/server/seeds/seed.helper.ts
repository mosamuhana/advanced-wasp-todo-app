import { PrismaClient } from '@prisma/client';
import type { User, Prisma } from '@prisma/client';

type UserCreateData = Prisma.UserCreateArgs['data'];

export async function createUser(prisma: PrismaClient, data: UserCreateData) {
  const { password, ...newUser } = await prisma.user.create({ data });
  return newUser as User;
}
