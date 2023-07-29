import { generateAvailableDictionaryUsername, generateAvailableUsername } from '@wasp/core/auth.js'

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../env';

export function config() {
  console.log('Inside user-supplied Google config');
  return {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    scope: ['profile', 'email'],
  };
}

export async function getUserFields(_: any, args: any) {
  console.log('Inside user-supplied Google getUserFields');
  const email = args.profile.emails.length > 0 ? args.profile.emails[0].value : null;
  return { email, isEmailVerified: !!email };
}
