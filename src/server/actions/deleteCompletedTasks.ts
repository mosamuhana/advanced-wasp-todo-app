import HttpError from '@wasp/core/HttpError.js';
import { DeleteCompletedTasks } from '@wasp/actions/types';
import { Prisma } from '@prisma/client';

type ActionFn = DeleteCompletedTasks<void, Prisma.BatchPayload>;

const action: ActionFn = async (_, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const result = await Task.deleteMany({
    where: {
      isDone: true,
      userId: user.id,
    },
  });

  return result;
};

export default action;
