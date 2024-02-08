/* eslint-disable @typescript-eslint/ban-types */

import type { TokenAdapter } from '../structures';

export type RequestOptions<T extends 'app' | 'user' = 'app' | 'user'> = {
    useTokenType: T
} & (T extends 'user' ? { userToken?: TokenAdapter } : {})