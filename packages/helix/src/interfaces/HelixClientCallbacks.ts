/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TokenAdapter } from '../structures';

export interface HelixClientCallbacks {
    onAppTokenRefresh?: (oldToken: Omit<TokenAdapter<'app'>, 'setRefreshToken' | 'setToken'>, newToken: TokenAdapter<'app'>) => Promise<any> | any
    onUserTokenRefresh?: (oldToken: Omit<TokenAdapter<'code'>, 'setRefreshToken' | 'setToken'>, newToken: TokenAdapter<'code'>) => Promise<any> | any
}