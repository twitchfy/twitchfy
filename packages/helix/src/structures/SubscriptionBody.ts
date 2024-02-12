import type { PostEventSubSubscriptionBody, PostEventSubSubscriptionTransport } from '@twitchapi/api-types';
import type { SubscriptionOptions } from '../interfaces';

export class SubscriptionBody implements PostEventSubSubscriptionBody {

  public type: string;
  public version: string;
  public condition: object;
  public transport: PostEventSubSubscriptionTransport;

  public constructor(options: SubscriptionOptions) {

    this.type = options.type;

    this.version = options.version;

    this.transport = options.transport;

    this.condition = options.condition;

  }

}