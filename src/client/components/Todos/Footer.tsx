import { Task } from '@wasp/entities';
import deleteCompletedTasksAction from '@wasp/actions/deleteCompletedTasks.js';

import type { NonEmptyArray } from '../../types';

export const Footer = ({ tasks }: { tasks: NonEmptyArray<Task> }) => {
  const completedCount = tasks.filter((t) => t.isDone).length;
  const uncompletedCount = tasks.filter((t) => !t.isDone).length;

  const onClick = async () => {
    try {
      await deleteCompletedTasksAction();
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>{uncompletedCount} items left</div>

      <div>
        <button
          className={'btn btn-red ' + (completedCount > 0 ? '' : 'hidden')}
          onClick={onClick}
        >
          Delete completed
        </button>
      </div>
    </div>
  );
};
