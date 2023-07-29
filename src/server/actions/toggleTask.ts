import HttpError from '@wasp/core/HttpError.js';
import { ToggleTask } from '@wasp/actions/types';
import { Task } from '@wasp/entities';

type Input = Pick<Task, 'id'>;
type ActionFn = ToggleTask<Input, Task>;

const action: ActionFn = async ({ id }, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  let task = await Task.findFirst({ where: { id, userId: user.id } });

  if (!task) {
    throw new HttpError(404);
  }

  task = await Task.update({
    where: { id, userId: user.id },
    data: { isDone: !task.isDone },
  });

  return task;
};

export default action;
