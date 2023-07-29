import type { Task } from '@wasp/entities';
import { createTheme } from '@stitches/react'

export type NonEmptyArray<T> = [T, ...T[]];
export type UpdateTaskIsDonePayload = Pick<Task, 'id' | 'isDone'>;

export type Appearance = Parameters<typeof createTheme>[0];
