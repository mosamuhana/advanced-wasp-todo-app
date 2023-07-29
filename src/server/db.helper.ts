import HttpError from '@wasp/core/HttpError.js';
import { Task } from '@wasp/entities';
import { PrismaClient } from '@prisma/client';

export async function findTask(Task: PrismaClient['task'], id: number, userId: number): Promise<Task> {
  const task = await Task.findFirst({ where: { id, userId } });

  if (!task) {
    throw new HttpError(404);
  }

  return task;
}
