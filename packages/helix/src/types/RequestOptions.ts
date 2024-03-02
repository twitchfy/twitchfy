/* eslint-disable @typescript-eslint/ban-types */

import type { UserTokenAdapter } from './UserTokenAdapter';

export type RequestOptions<T extends 'app' | 'user' = 'app' | 'user'> = {
    useTokenType: T
} & (T extends 'user' ? { userToken?: UserTokenAdapter<boolean> } : {})