import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@wasp/queries';
import { OptimisticUpdateDefinition, useAction } from '@wasp/actions';
import updateTaskIsDoneAction from '@wasp/actions/updateTaskIsDone';
import getTaskQuery from '@wasp/queries/getTask.js';
import getTasksQuery from '@wasp/queries/getTasks.js';
import { Task } from '@wasp/entities';

type TaskPayload = Pick<Task, 'id' | 'isDone'>;

export default function TaskInfoPage(props: any) {
  const taskId = parseInt(props.match.params.id);
  const { data: task, isFetching, error, isError } = useQuery(getTaskQuery, { id: taskId });

  if (!task) return <div> Task with id {taskId} does not exist. </div>;
  if (isError) return <div> Error occurred! {error.message} </div>;

  return (
    <>
      {isFetching
        ? (<div> Fetching task ... </div>)
        : (<TaskDetails task={task} />)
      }
      <br />
      <Link to="/">Go to dashboard</Link>
    </>
  );
};

function TaskDetails({ task }: { task: Task; }) {
  const updateTask = useAction(updateTaskIsDoneAction, {
    optimisticUpdates: [
      {
        getQuerySpecifier: () => [getTaskQuery, { id: task.id }],
        // This query's cache should should never be emtpy
        updateQuery: ({ isDone }, oldTask) => ({ ...oldTask!, isDone }),
      } as OptimisticUpdateDefinition<TaskPayload, Task>,
      {
        getQuerySpecifier: () => [getTasksQuery],
        updateQuery: (updatedTask, oldTasks) =>
          oldTasks &&
          oldTasks.map((task) =>
            task.id === updatedTask.id ? { ...task, ...updatedTask } : task
          ),
      } as OptimisticUpdateDefinition<TaskPayload, Task[]>,
    ],
  });

  async function toggleIsDone({ id, isDone }: Task) {
    try {
      updateTask({ id, isDone: !isDone });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h2>Task</h2>
      <div> id: {task.id} </div>
      <div> description: {task.description} </div>
      <div> is done: {task.isDone ? 'Yes' : 'No'} </div>
      <button onClick={() => toggleIsDone(task)} className="text-blue-700 hover:underline">
        Mark as {task.isDone ? 'undone' : 'done'}
      </button>
    </>
  );
};
