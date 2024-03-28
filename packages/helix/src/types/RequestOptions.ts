/* eslint-disable @typescript-eslint/ban-types */

import type { UserTokenAdapter } from './UserTokenAdapter';

export type RequestOptions<T extends 'app' | 'user' = 'app' | 'user', K extends boolean = false> = {
    useTokenType?: T,
    refreshToken?: boolean
} & (T extends 'user' ? { userToken?: UserTokenAdapter<boolean> } : {}) & (K extends true? { pages?: number, data_per_page?: number } : {}) 