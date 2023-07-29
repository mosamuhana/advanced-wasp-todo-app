import { generateAvailableUsername } from '@wasp/core/auth.js';

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../env';

export function config() {
  console.log('Inside user-supplied GitHub config');
  return {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    scope: [],
  };
}

export async function getUserFields(_context: any, args: any) {
  console.log('Inside user-supplied GitHub getUserFields');
  const username = await generateAvailableUsername([args.profile.username], { separator: '-' });
  return { username };
}
