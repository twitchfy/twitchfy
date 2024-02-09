/* eslint-disable @typescript-eslint/ban-types */

import type { TokenTypes } from './TokenTypes';

export type TokenAdapterOptions<T extends TokenTypes, K extends boolean = true > = {

    token: string
    type: T

} & ( T extends 'code' ? { refresh?: K } & ( K extends true? { refreshToken: string } : {} ) : {} )