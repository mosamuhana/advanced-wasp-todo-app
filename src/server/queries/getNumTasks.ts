import { GetNumTasks } from '@wasp/queries/types';

type QueryFn = GetNumTasks<void, number>;

const query: QueryFn = async (_, context) => {
  return context.entities.Task.count();
};

export default query;
