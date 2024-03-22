import type { Document, Model }  from 'mongoose';
import { Schema, model } from 'mongoose';
import type { SubscriptionTypes } from '../../enums';
import type { SubscriptionTypeOptions } from '../../interfaces';


export interface ISubscription<T extends SubscriptionTypes = SubscriptionTypes> extends Document {
    id: string;
    secret?: string;
    type: T;
    options: SubscriptionTypeOptions[T]; 
    nonce?: string;
  }
  
export const SubscriptionSchema = new Schema<ISubscription>({
  id: { type: String, required: true },
  secret: { type: String },
  type: { type: String, required: true },
  options: { type: Schema.Types.Mixed, required: true },
  nonce: { type: String }
});
  
export const SubscriptionModel: Model<ISubscription> = model('subscriptions', SubscriptionSchema);