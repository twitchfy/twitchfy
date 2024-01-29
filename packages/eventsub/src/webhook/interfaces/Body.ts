import { BodySubscription } from '.';
import { BodyTypes } from '../types';

export interface Body<T extends BodyTypes = BodyTypes>{
    challenge: T extends 'webhook_callback_verification' ?  string : never
    subscription: BodySubscription;
    event: T extends 'notification' ? object : never;
}