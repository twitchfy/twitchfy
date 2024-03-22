import type { ConnectionTypes } from '../types';
import type { StorageAdapter } from '../storage';

export interface StorageOptions<K extends ConnectionTypes>{
    adapter: StorageAdapter<K>
}