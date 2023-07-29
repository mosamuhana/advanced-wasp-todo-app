import { useQuery } from '@wasp/queries';
import getTasks from '@wasp/queries/getTasks.js';

import { areThereAnyTasks } from '../../utils';
import { Footer } from './Footer';
import { NewTask } from './NewTask';
import { TaskList } from './TaskList';
import { ToggleAllTasks } from './ToggleAllTasks';
import { ErrorMessage } from '../ErrorMessage';

export const Todos = () => {
  const { data: tasks, isError, error } = useQuery(getTasks);

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="
        w-1/2 min-w-[400px] p-6
        shadow-md rounded border border-gray-200
        flex flex-col gap-2
      ">
        <h1 className="p-2 text-center">Todos</h1>

        <div className="flex items-center gap-2">
          <ToggleAllTasks disabled={!areThereAnyTasks(tasks)} />
          <NewTask />
        </div>

        {isError && <ErrorMessage message={'Error during fetching tasks: ' + (error.message || '')} />}

        {areThereAnyTasks(tasks) && (
          <>
            <TaskList tasks={tasks} />
            <Footer tasks={tasks} />
          </>
        )}
      </div>
    </div>
  );
};
