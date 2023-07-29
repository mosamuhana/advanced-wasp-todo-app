import HttpError from '@wasp/core/HttpError.js';
import { ToggleAllTasks } from '@wasp/actions/types';
import { Prisma } from '@prisma/client';

type ActionFn = ToggleAllTasks<void, Prisma.BatchPayload>;

const action: ActionFn = async (_, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const whereIsDone = (isDone: boolean): Prisma.TaskWhereInput => ({ isDone, userId: user.id });

  let where: Prisma.TaskWhereInput = whereIsDone(false);
  let data: Prisma.TaskUpdateManyMutationInput = { isDone: true };

  const notDoneTasksCount = await Task.count({ where });
  if (notDoneTasksCount === 0) {
    where = whereIsDone(true);
    data = { isDone: false };
  }

  const result = await Task.updateMany({ where, data });

  return result;
};

export default action;
