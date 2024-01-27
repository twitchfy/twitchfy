import { randomBytes } from 'node:crypto';

export function generateSecret() {
  return randomBytes(32).toString('hex');
}