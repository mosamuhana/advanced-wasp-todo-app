import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { OptimisticUpdateDefinition, useAction } from '@wasp/actions';
import { Task } from '@wasp/entities';
import getTasksQuery from '@wasp/queries/getTasks.js';
import updateTaskAction from '@wasp/actions/updateTask.js';
import deleteTaskAction from '@wasp/actions/deleteTask';
import { DeleteIcon } from '../icons/DeleteIcon';

type Input = {
  id: Task['id'],
  isDone?: Task['isDone'],
  description?: Task['description'],
};

type OptimisticUpdateTask = OptimisticUpdateDefinition<Input, Task[]>;

export const TaskItem = ({ task }: { task: Task }) => {
  const busyRef = useRef(false);

  const deleteTask = useAction(deleteTaskAction);

  const updateTask = useAction(updateTaskAction, {
    optimisticUpdates: [
      {
        getQuerySpecifier: () => [getTasksQuery],
        updateQuery: (updatedTask, oldTasks) => {
          if (oldTasks === undefined) {
            return [{ ...task, ...updatedTask }];
          } else {
            return oldTasks.map((task) =>
              task.id === updatedTask.id ? { ...task, ...updatedTask } : task
            );
          }
        },
      } as OptimisticUpdateTask,
    ],
  });

  const onChange  = async (e: ChangeEvent<HTMLInputElement>) => {
    if (busyRef.current) return;

    const isDone = e.target.checked;

    busyRef.current = true;
    try {
      await updateTask({ id: task.id, isDone });
    } catch (ex) {
      console.error(ex);
    } finally {
      busyRef.current = false;
    }
  };

  const onDelete = async () => {
    if (busyRef.current) return;

    const canRun = confirm('Do you want to delete ?');
    if (!canRun) return;

    busyRef.current = true;
    try {
      await deleteTask({ id: task.id })
    } catch (ex) {
      console.error(ex);
    } finally {
      busyRef.current = false;
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          id={String(task.id)}
          checked={task.isDone ?? false}
          onChange={onChange}
        />
        <Link to={`/task/${task.id}`}>{task.description}</Link>
      </div>
      <button onClick={onDelete}>
        <DeleteIcon className="w-5 h-5 text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
};
