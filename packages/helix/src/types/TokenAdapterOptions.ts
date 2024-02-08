/* eslint-disable @typescript-eslint/ban-types */

import type { TokenTypes } from './TokenTypes';

export type TokenAdapterOptions<T extends TokenTypes> = {

    token: string
    type: T

} & ( T extends 'code' ? { refreshToken: string } : {} )