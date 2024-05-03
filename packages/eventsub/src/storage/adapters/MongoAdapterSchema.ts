import type { Document, Model }  from 'mongoose';
import { Schema, model } from 'mongoose';
import type { SubscriptionTypes } from '../../enums';
import type { SubscriptionTypeOptions } from '../../interfaces';

/**
 * The interface of the schema for saving subscription within the MongoAdapter.
 */
export interface ISubscription<T extends SubscriptionTypes = SubscriptionTypes> extends Document {
    id: string;
    secret?: string;
    type: T;
    options: SubscriptionTypeOptions[T]; 
    nonce?: string;
  }
  

/**
 * The schema for saving subscription within the MongoAdapter.
 */
export const SubscriptionSchema = new Schema<ISubscription>({
  id: { type: String, required: true },
  secret: { type: String },
  type: { type: String, required: true },
  options: { type: Schema.Types.Mixed, required: true },
  nonce: { type: String }
});
  
/**
 * The model of the schema for saving subscription within the MongoAdapter.
 */
export const SubscriptionModel: Model<ISubscription> = model('subscriptions', SubscriptionSchema);