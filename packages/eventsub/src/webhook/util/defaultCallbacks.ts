import { writeFile } from 'node:fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import type { WebhookConnection } from '../structures';
import type { SubscriptionJSON } from '../interfaces';
import type { SubscriptionTypes } from '../../enums';
import type { Subscription } from '../../structures';

const path = join(__dirname, '..', 'subscriptions.json');

export async function createCallback(subscription: Subscription<SubscriptionTypes, WebhookConnection>){

  if(!existsSync(path)) await writeFile(path, '{}', { flag: 'w' });

  const data = require(path) as SubscriptionJSON;

  if(data[subscription.id]) return;

  data[subscription.id] = subscription.secret;

  await writeFile(path, JSON.stringify(data));

  return;
}

export async function deleteCallback(id: string){

  if(!existsSync(path)) await writeFile(path, '{}', { flag: 'w' });

  const data = require(path) as SubscriptionJSON;

  if(!data[id]) return;

  delete data[id];

  await writeFile(path, JSON.stringify(data));

}

export async function getCallback(id: string): Promise<string | null>{

  if(!existsSync(path)) return null;

  const data = require(path) as SubscriptionJSON;

  if(!data) return null;

  return data[id] || null;

}