import HttpError from '@wasp/core/HttpError.js';
import { UpdateTaskIsDone } from '@wasp/actions/types';
import { Task } from '@wasp/entities';
import { Prisma } from '@prisma/client';

type Input = Pick<Task, 'id' | 'isDone'>;
type ActionFn = UpdateTaskIsDone<Input, Prisma.BatchPayload>;

const action: ActionFn = async ({ id, isDone }, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  // Uncomment to test optimistic updates
  // const sleep = (ms) => new Promise(res => setTimeout(res, ms))
  // await sleep(3000);

  const result = await Task.updateMany({
    where: { id, userId: user.id },
    data: { isDone },
  });

  return result;
};

export default action;
