import { useState, useMemo, useRef } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';

import { OptimisticUpdateDefinition, useAction } from '@wasp/actions';
import getTasksQuery from '@wasp/queries/getTasks.js';
import createTaskAction from '@wasp/actions/createTask.js';
import { Task } from '@wasp/entities';

type OptimisticCreateTask = OptimisticUpdateDefinition<Pick<Task, 'description'>, Task[]>;

export const NewTask = () => {
  const [value, setValue] = useState('');
  const busyRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canSubmit = useMemo(() => !busyRef.current && value.trim().length > 0, [value, busyRef.current]);

  const createTask = useAction(createTaskAction, {
    optimisticUpdates: [
      {
        getQuerySpecifier: () => [getTasksQuery],
        updateQuery: (newTask, oldTasks) => {
          const task = newTask as Task;
          if (oldTasks === undefined) {
            // cache is empty
            return [task];
          } else {
            return [...oldTasks, task];
          }
        },
      } as OptimisticCreateTask,
    ],
  });

  const submit = async () => {
    if (!canSubmit) return;

    busyRef.current = true;
    try {
      await createTask({ description: value.trim() });
      setValue('');
      inputRef.current?.focus();
    } catch (ex) {
      console.log(ex);
    } finally {
      busyRef.current = false;
    }
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <div className="flex gap-2 items-center flex-1 w-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onInputKeyDown}
        className="flex-1 w-[100px]"
      />
      <button
        className="btn btn-primary flex-none"
        disabled={!canSubmit}
        onClick={submit}
      >Create</button>
    </div>
  );
};
