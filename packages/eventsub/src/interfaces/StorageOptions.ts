import type { ConnectionTypes } from '../types';
import type { StorageAdapter } from '../storage';

/**
 * The options for the storage of subscriptions.
 */
export interface StorageOptions<K extends ConnectionTypes>{
    adapter: StorageAdapter<K>
}