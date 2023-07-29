import { Task } from '@wasp/entities';

import type { NonEmptyArray } from '../../types';
import { TaskItem } from './TaskItem';

type Props = {
  tasks: NonEmptyArray<Task>;
};

export const TaskList = ({ tasks }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {tasks.map((task, idx) => (<TaskItem task={task} key={idx} />))}
    </div>
  );
};
