import { Task } from '@wasp/entities';
import type { NonEmptyArray } from './types';

export function areThereAnyTasks(tasks: Task[] | undefined): tasks is NonEmptyArray<Task> {
  return !!(tasks && tasks.length > 0);
}
