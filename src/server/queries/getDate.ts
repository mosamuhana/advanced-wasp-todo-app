import { GetDate } from '@wasp/queries/types';

type QueryFn = GetDate<void, Date>;

const query: QueryFn = async () => {
  return new Date();
};

export default query;
