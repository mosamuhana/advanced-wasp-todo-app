import { test, expect } from 'vitest';
import { screen } from '@testing-library/react';

import { mockServer, renderInContext } from '@wasp/test';
import getTasks from '@wasp/queries/getTasks';
import getDate from '@wasp/queries/getDate';
import { Todos } from './components/Todos';
import { areThereAnyTasks } from './utils';
import { App } from './App';
import { getMe } from '@wasp/auth/useAuth';

test('areThereAnyTasks', () => {
  expect(areThereAnyTasks([])).toBe(false);
});

const { mockQuery } = mockServer();

const mockTasks = [
  {
    id: 1,
    description: 'test todo 1',
    isDone: true,
    userId: 1,
  },
];

test('handles mock data', async () => {
  mockQuery(getTasks, mockTasks);

  renderInContext(<Todos />);

  await screen.findByText('test todo 1');

  expect(screen.getByRole('checkbox')).toBeChecked();

  screen.debug();
});

const mockUser = {
  id: 12,
  email: 'elon@tesla.com',
  isEmailVerified: false,
  emailVerificationSentAt: null,
  passwordResetSentAt: null,
};

test('handles multiple mock data sources', async () => {
  mockQuery(getMe, mockUser);
  mockQuery(getDate, new Date());
  mockQuery(getTasks, mockTasks);

  renderInContext(
    <App>
      <Todos />
    </App>
  );

  await screen.findByText('elon@tesla.com');

  expect(screen.getByRole('checkbox')).toBeChecked();

  screen.debug();
});
