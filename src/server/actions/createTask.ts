import HttpError from '@wasp/core/HttpError.js';
import { Task } from '@wasp/entities';
import { CreateTask } from '@wasp/actions/types';

import { getSomeResource } from '../serverSetup.js';

type Input = Pick<Task, 'description'>;
type ActionFn = CreateTask<Input, Task>;

const action: ActionFn = async (input, context) => {
  const { user, entities: { Task } } = context;

  if (!user) {
    throw new HttpError(401);
  }

  const newTask = await Task.create({
    data: {
      description: input.description,
      isDone: false,
      userId: user.id,
    },
  });

  console.log('New task created!, current value of someResource is: ' + getSomeResource());

  return newTask;
};

export default action;
