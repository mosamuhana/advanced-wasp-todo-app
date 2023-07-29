import HttpError from '@wasp/core/HttpError.js';
import { UpdateTask } from '@wasp/actions/types';
import { Task } from '@wasp/entities';

type TaskData = Pick<Task, 'isDone' | 'description'>;
type UpdateTaskInput = Pick<Task, 'id'> & Partial<TaskData>;
type ActionFn = UpdateTask<UpdateTaskInput, Task>;

const action: ActionFn = async (input, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const { id, ...data } = input;

  const task = await Task.findFirst({ where: { id, userId: user.id } });

  if (!task) {
    throw new HttpError(404);
  }

  if (!Object.keys(data).length) {
    return task;
  }

  return await Task.update({
    where: { id, userId: user.id },
    data,
  });
};

export default action;
