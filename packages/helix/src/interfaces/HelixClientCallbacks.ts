/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TokenAdapter } from '../structures';

export interface HelixClientCallbacks {
    onAppTokenRefresh?: (oldToken: TokenAdapter<'app'>, newToken: TokenAdapter<'app'>) => Promise<any> | any
    onUserTokenRefresh?: (oldToken: TokenAdapter<'code' | 'device'>, newToken: TokenAdapter<'code' | 'device'>) => Promise<any> | any
}